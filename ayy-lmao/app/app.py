from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# import pathlib

# PATH = pathlib.Path('timeseries.sqlite3')
app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///timeseries.sqlite3'

# db = SQLAlchemy(app)


# class DataPoint(db.Model):
#     idx = db.Column(db.Integer, primary_key=True)
#     val = db.Column(db.Float)


@app.route('/')
def index():
    return "Hello Junction!"


@app.route('/el', methods=['GET'])
def el():
    return jsonify(name="electricity", data=[2, 4, 6, 8, 10, 12])


@app.route('/heat', methods=['GET'])
def heat():
    return jsonify(name="heat", data=[2, 4, 6, 8, 10, 12])


@app.route('/water', methods=['GET'])
def water():
    return jsonify(name="water", data=[2, 4, 6, 8, 10, 12])


@app.route('/dir', methods=['POST'])
def dir_post():
    dir = request.json['dir']

    if dir == "L":
        print("LEFT")
        return "L"
    elif dir == "R":
        print("RIGHT")
        return "L"
    else:
        print("Something else came through")
        return "Something else"


@app.route('/dir', methods=['GET'])
def dir_get():
    return "You requested direction"


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
