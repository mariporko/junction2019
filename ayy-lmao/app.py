from flask import Flask, request, jsonify
from datetime import date
from flask_cors import cross_origin

import analysis


# from flask_sqlalchemy import SQLAlchemy
# import pathlib

# PATH = pathlib.Path('timeseries.sqlite3')
app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///timeseries.sqlite3'

# db = SQLAlchemy(app)
global direction
direction = None
# class DataPoint(db.Model):
#     idx = db.Column(db.Integer, primary_key=True)
#     val = db.Column(db.Float)
current_week = date.today().isocalendar()[1]


@app.route('/')
@cross_origin()
def index():
    return "Hello Junction!"


@app.route('/el', methods=['GET'])
@cross_origin()
def el():
    cur_week_data = analysis.weekly_data['electricity'][str(current_week)]
    return jsonify(current_week=cur_week_data,
                   average=analysis.weekly_data['electricity']["Average"],
                   maximum=analysis.weekly_data['electricity']["Maximum"],
                   minimum=analysis.weekly_data['electricity']["Minimum"],
                   total=analysis.weekly_data['electricity']["Total"])


@app.route('/heat', methods=['GET'])
@cross_origin()
def heat():
    cur_week_data = analysis.weekly_data['heating'][str(current_week)]
    return jsonify(current_week=cur_week_data,
                   average=analysis.weekly_data['heating']["Average"],
                   maximum=analysis.weekly_data['heating']["Maximum"],
                   minimum=analysis.weekly_data['heating']["Minimum"],
                   total=analysis.weekly_data['heating']["Total"])


@app.route('/water', methods=['GET'])
@cross_origin()
def water():
    cur_week_data = analysis.weekly_data['water'][str(current_week)]
    return jsonify(current_week=cur_week_data,
                   average=analysis.weekly_data['water']["Average"],
                   maximum=analysis.weekly_data['water']["Maximum"],
                   minimum=analysis.weekly_data['water']["Minimum"],
                   total=analysis.weekly_data['water']["Total"])


@app.route('/dir', methods=['POST'])
@cross_origin()
def dir_post():
    dir = request.json['dir']

    if dir == "L":
        print("LEFT")
        direction = "L"
    elif dir == "R":
        print("RIGHT")
        direction = "R"
    elif dir == "U":
        print("UP")
        direction = "U"
    else:
        print("Something else came through")
        direction = None

    return jsonify(direction=direction)


@app.route('/dir', methods=['GET'])
@cross_origin()
def dir_get():
    return direction


# @app.route('/get_data', methods=['GET'])
# def get_data():
#     db.session.add(DataPoint(val=1.2))
#     db.session.add(DataPoint(val=4.5))
#     db.session.add(DataPoint(val=2.2))
#     db.session.commit()
#     data = DataPoint.query.all()

#     for point in data:
#         print("{0}, {1}".format(point.idx, point.val))

#     return "Points printed"


if __name__ == '__main__':
    # if not PATH.is_file():
    #     db.create_all()
    # else:
    #     db.drop_all()
    # db.create_all()
    app.run(debug=True)
