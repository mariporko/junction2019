'''
File: estimator.py
Project: MobilePose-PyTorch
File Created: Monday, 11th March 2019 12:50:16 am
Author: Yuliang Xiu (yuliangxiu@sjtu.edu.cn)
-----


Last modified by ayyHello Junction 2019 team


-----
Copyright 2018 - 2019 Shanghai Jiao Tong University, Machine Vision and Intelligence Group
'''


import itertools
import logging
import math
from collections import namedtuple

import cv2
import numpy as np
import torch

from scipy.ndimage import maximum_filter, gaussian_filter

from scipy.spatial import distance as dist

from skimage import io, transform

class ResEstimator:
    def __init__(self, model_path, net, inp_dim=224):
        self.inp_dim = inp_dim
        self.net = net
        self.net.load_state_dict(torch.load(model_path, map_location=lambda storage, loc: storage))
        self.net.eval()

    def addlayer(self, image):
        h, w = image.shape[:2]
        # todo retraining model
        x = np.arange(0, h)
        y = np.arange(0, w) 
        x, y = np.meshgrid(x, y)
        x = x[:,:, np.newaxis]
        y = y[:,:, np.newaxis]
        image = np.concatenate((image, x, y), axis=2)
        
        return image

    def wrap(self, image, output_size):
        image_ = image/256.0
        h, w = image_.shape[:2]
        if isinstance(output_size, int):
            if h > w:
                new_h, new_w = output_size * h / w, output_size
            else:
                new_h, new_w = output_size, output_size * w / h
        else:
            new_h, new_w = output_size

        new_h, new_w = int(new_h), int(new_w)

        image = transform.resize(image_, (new_w, new_h))
        pose_fun = lambda x: (x.reshape([-1,2]) * 1.0 /np.array([new_w, new_h])*np.array([w,h]))
        return {'image': image, 'pose_fun': pose_fun}
        
    def rescale(self, image, output_size):

        image_ = image/256.0
        h, w = image_.shape[:2]
        im_scale = min(float(output_size[0]) / float(h), float(output_size[1]) / float(w))
        new_h = int(image_.shape[0] * im_scale)
        new_w = int(image_.shape[1] * im_scale)
        image = cv2.resize(image_, (new_w, new_h), interpolation=cv2.INTER_LINEAR)
        left_pad =int( (output_size[1] - new_w) / 2.0)
        top_pad = int((output_size[0] - new_h) / 2.0)
        mean=np.array([0.485, 0.456, 0.406])
        pad = ((top_pad, top_pad), (left_pad, left_pad))
        image = np.stack([np.pad(image[:,:,c], pad, mode='constant', constant_values=mean[c])for c in range(3)], axis=2)
        pose_fun = lambda x: ((((x.reshape([-1,2])+np.array([1.0,1.0]))/2.0*np.array(output_size)-[left_pad, top_pad]) * 1.0 /np.array([new_w, new_h])*np.array([w,h])))
        return {'image': image, 'pose_fun': pose_fun}

    def to_tensor(self, image):
     
        mean=np.array([0.485, 0.456, 0.406])
        std=np.array([0.229, 0.224, 0.225])    
        image = torch.from_numpy(((image-mean)/std).transpose((2, 0, 1))).float()
        return image

    def inference(self, in_npimg):
        canvas = np.zeros_like(in_npimg)
        height = canvas.shape[0]
        width = canvas.shape[1]

        rescale_out = self.rescale(in_npimg, (self.inp_dim, self.inp_dim))
       
        image = rescale_out['image']
        image = self.to_tensor(image)
        image = image.unsqueeze(0)
        pose_fun = rescale_out['pose_fun']

        keypoints = self.net(image)
        keypoints = keypoints[0].detach().numpy()
        keypoints = pose_fun(keypoints).astype(int)

        return keypoints

    @staticmethod
    def draw_humans(npimg, pose, imgcopy=False):
        if imgcopy:
            npimg = np.copy(npimg)
        image_h, image_w = npimg.shape[:2]
        centers = {}

        # colors = [[255,255,255], [255,255,255]]

        handpairs = [[8,10],[8,15]]
        chestPair = [[6,7]]
        # colors_skeleton = ['r','r']
        # colors_skeleton = [[255,255,255], [255,255,255]]


        # colors = [[0, 255, 0], [0, 255, 255], [255, 0, 0], [255,255,255], [255,255,255]]

        # pairs = [[8,7],[8,12],[8,13],[13,14],[14,15]]
        # colors_skeleton = ['m', 'g', 'g','r','r']
        # colors_skeleton = [[0, 255, 0], [0, 255, 255], [255, 0, 0], [255,255,255], [255,255,255]]


        # colors = [[0, 255, 170], [0, 255, 255], [0, 170, 255], [0, 85, 255], [0, 0, 255], [85, 0, 255],
        #       [170, 0, 255], [255, 0, 255]]

        # pairs = [[4,5],[8,7],[7,6],[6,2],[6,3],[8,12],[8,13]]
        # colors_skeleton = ['g', 'm', 'm', 'g', 'g', 'y','y']
        # colors_skeleton = [[0, 0, 0], [0, 0, 255], [0, 255, 0], [0, 255, 255], [255, 0, 0], [255, 0, 255],
        #       [255, 255, 0]]



        colors = [[255, 0, 0], [255, 85, 0], [255, 170, 0], [255, 255, 0], [170, 255, 0], [85, 255, 0], [0, 255, 0],
              [0, 255, 85], [0, 255, 170], [0, 255, 255], [0, 170, 255], [0, 85, 255], [0, 0, 255], [85, 0, 255],
              [170, 0, 255], [255, 0, 255]]

        pairs = [[8,9],[11,12],[11,10],[2,1],[1,0],[13,14],[14,15],[3,4],[4,5],[8,7],[7,6],[6,2],[6,3],[8,12],[8,13]]
        colors_skeleton = ['r', 'y', 'y', 'g', 'g', 'y', 'y', 'g', 'g', 'm', 'm', 'g', 'g', 'y','y']
        colors_skeleton = [[255, 0, 0], [255, 85, 0], [255, 170, 0], [255, 255, 0], [170, 255, 0], [85, 255, 0], [0, 255, 0],
              [0, 255, 85], [0, 255, 170], [0, 255, 255], [0, 170, 255], [0, 85, 255], [0, 0, 255], [85, 0, 255],
              [170, 0, 255]]

        for idx in range(len(colors)):
            cv2.circle(npimg, (pose[idx,0], pose[idx,1]), 3, colors[idx], thickness=3, lineType=8, shift=0)
        for idx in range(len(colors_skeleton)):
            npimg = cv2.line(npimg, (pose[pairs[idx][0],0], pose[pairs[idx][0],1]), (pose[pairs[idx][1],0], pose[pairs[idx][1],1]), colors_skeleton[idx], 3)

        #print(pose[pairs[1][0], 0])
        #print("\n")

        #len_1 = dist.euclidean(pose[pairs[0][0],0], pose[pairs[0][1],0])
        #len_2 = dist.euclidean(pose[pairs[1][0],0], pose[pairs[1][1],0])
        #print(len_1)
        #print(len_2)
        # print(pose[pairs[0][0],0])
        # print(pose[pairs[0][1],0])
        # print(pose[pairs[1][0],0])
        # print(pose[pairs[1][1],0])
        # print("\n")

        # Distance between neck and palms in X-direction
        len_1 = abs(pose[handpairs[0][1],0]-pose[handpairs[0][0],0])
        len_2 = abs(pose[handpairs[1][1],0]-pose[handpairs[1][0],0])

        # Distance between neck and palms in Y-direction
        hAnDheIght_one = pose[handpairs[0][1], 1]-pose[handpairs[0][0],1]
        handHeight_2 = pose[handpairs[1][1], 1]-pose[handpairs[1][0],1]

        chestHeightAbsolute = (pose[chestPair[0][0],1] + pose[chestPair[0][1],1]) / 2
        handHeightMaxAbsolute = min(pose[handpairs[0][1],1], pose[handpairs[1][1],1])

        #print("chestHeightAbsolute:", chestHeightAbsolute)
        #print("handHeightMaxAbsolute: ", handHeightMaxAbsolute)

        handHeightMax = min(hAnDheIght_one, handHeight_2)

        #print("handHeight: ", handHeightMax)

        # If handHeightMax < 0, hand(s) are above neck
        if(hAnDheIght_one < 10 and handHeight_2 < 10):
            lr = "U"
        elif((len_1 > len_2) and (handHeightMaxAbsolute < chestHeightAbsolute) ):
            lr = "R"
        elif( (len_2 > len_1) and (handHeightMaxAbsolute < chestHeightAbsolute) ):
            lr = "L"
        else:
            lr = "D"


        # let's calculate a relative significance of hand position
        total = len_1 + len_2
        am_1 = len_1 / total
        am_2 = len_2 / total
        amount = max(am_1, am_2)

        return npimg, lr, amount

