'''
File: run_webcam.py
Project: MobilePose-PyTorch
File Created: Monday, 11th March 2019 12:47:30 am
Author: Yuliang Xiu (yuliangxiu@sjtu.edu.cn)
-----






Modified in Junction 2019 hackathon by ayyHello! team






-----
Copyright 2018 - 2019 Shanghai Jiao Tong University, Machine Vision and Intelligence Group
'''

import argparse
import logging
import time

import cv2
import os
import numpy as np

import torch
import torch.nn as nn
from torchvision import models

from estimator import ResEstimator
from networks import *
from network import CoordRegressionNetwork
from dataloader import crop_camera

import json

datacache = []

import requests
def postDirection(direction):
    try:
        API_url = "http://10.42.0.157:5000/dir"
        myobj = {'dir': direction}
        print(json.dumps(myobj))
        r = requests.post(API_url, json = myobj)
        print(r.status_code, r.reason)
    except Exception as e:
        print(e)


def submitData(data):
    global datacache
    global lastdir
    datacache.append(data)
    datalen_max = 10

    if(len(datacache)>= datalen_max):
        Lcount = 0
        Rcount = 0
        Ucount = 0
        for item in datacache: 
            if item == "L": 
                Lcount += 1
            if item == "U":
                Ucount += 1
            if item == "R":
                Rcount += 1
        datacache.clear()
        print("Lcount: ", Lcount)
        print("Ucount: ", Ucount)
        if(Ucount > datalen_max / 2):
            print("Changing lastdir to U")
            postDirection("U")
            lastdir = "U"
            return "U"
        if(Rcount >= datalen_max / 2):
            #postDirection("L")
            print("Changing lastdir to R")
            postDirection("R")
            lastdir = "R"
            return "R"
        if(Lcount >= datalen_max / 2):
            #postDirection("L")
            print("Changing lastdir to L")
            postDirection("L")
            lastdir = "L"
            return "L"
        else:
            #postDirection("R")
            print("Changing lastdir to D")
            postDirection("D")
            lastdir = "D"
            return "D"


# import matplotlib
# matplotlib.use('Agg')
import matplotlib.pyplot as plt

if __name__ == '__main__':
    global img
    global image
    lastdir = "R"

    parser = argparse.ArgumentParser(description='MobilePose Realtime Webcam.')
    parser.add_argument('--model', type=str, default='resnet18', choices=['mobilenetv2', 'resnet18', 'shufflenetv2', 'squeezenet'])
    parser.add_argument('--inp_dim', type=int, default=224, help='input size')
    parser.add_argument('--camera', type=int, default=0)

    args = parser.parse_args()

    # load the model 
    model_path = os.path.join("./models", args.model+"_%d_adam_best.t7"%args.inp_dim)
    net = CoordRegressionNetwork(n_locations=16, backbone=args.model).to("cpu")
    e = ResEstimator(model_path, net, args.inp_dim)

    # initial the camera
    cam = cv2.VideoCapture(args.camera)

    ret_val, image = cam.read()
    image = crop_camera(image)
    
    # small pointy finger image offset from image's border
    x_offset=y_offset=100

    value_threshold = 0.6

    while True:
        # read image from the camera and preprocess
        ret_val , image = cam.read()
        image = crop_camera(image)
        # forward the image
        humans = e.inference(image)
        image, lr, amount = ResEstimator.draw_humans(image, humans, imgcopy=False)
        print("lr, amount", lr, amount)
        if(lr == "L"):
            img_l = cv2.imread(r'/home/jesse/Koodiprojektit/Junction2019/mobilepose-pythorch/MobilePose-pytorch/left_2.png', 1)
            img_l_rs = cv2.resize(img_l, (100,100), interpolation = cv2.INTER_AREA)
            if(amount > value_threshold):
                asd = submitData("L")
            #image[y_offset:y_offset+img.shape[0], x_offset:x_offset+img.shape[1]] = img
        elif(lr == "R"):
            #print("Right")
            img_r = cv2.imread(r'/home/jesse/Koodiprojektit/Junction2019/mobilepose-pythorch/MobilePose-pytorch/right_2.png', 1)
            img_r_rs = cv2.resize(img_r, (100,100), interpolation = cv2.INTER_AREA)
            if(amount > value_threshold):
                asd = submitData("R")
        elif(lr == "U"):
            submitData("U")
        else:
            print("Hands down?")
            #exit()

        try:
            if(lastdir == "R"):
                print("Lastdir: R")
                image[y_offset:y_offset+img_r_rs.shape[0], image.shape[1]-x_offset: image.shape[1]] = img_r_rs
            elif (lastdir == "L"):
                print("Lastdir: L")
                image[y_offset:y_offset+img_l_rs.shape[0], x_offset:x_offset+img_l_rs.shape[1]] = img_l_rs
        except Exception as ex:
            print(ex)
            #image[y_offset:y_offset+img.shape[0], image.shape[1]-x_offset: image.shape[1]] = img
        #x_offset=y_offset=100
        #image[y_offset:y_offset+img.shape[0], x_offset:x_offset+img.shape[1]] = img

        #print(image.shape[0])
        cv2.imshow('MobilePose Demo', image)
        if cv2.waitKey(1) == 27: # ESC
            break

    cv2.destroyAllWindows()

    # # single person rgb image test
    # image = cv2.imread("./results/test.png")
    # humans = e.inference(image)
    # image = ResEstimator.draw_humans(image, humans, imgcopy=False)
    # cv2.imwrite("./results/out.png", image)
