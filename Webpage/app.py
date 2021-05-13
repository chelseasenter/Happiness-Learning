from flask import Flask, render_template, redirect, url_for, request, jsonify
from joblib import dump, load
from pickle import dump as dump_p, load as load_p
import backend
from flask_cors import CORS, cross_origin

# load the pipeline object
pipeline = load("text_classification.joblib")

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_ORIGINS'] = '*'
app.config['DEBUG'] = True

worldMap = backend.WorldMap()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/', methods=['GET', 'POST'])
# No action needed here. Just display index.
def index():
    map_data = worldMap.mapJson()
    return jsonify(map_data)

@app.route("/year_list")
def year_list():
    # getting data
    data = range(2015, 2022)
    data = list(data)
    response = {"years": data}
    return jsonify(response)

@app.route("/country_list")
def country_list():
    # getting data
    data = worldMap.get_countries()
    response = {"country": data}
    return jsonify(response)

@app.route("/x_category")
def x_category():
    # getting data
    data = worldMap.get_x_categories()
    data = list(data)
    response = {"x_categories": data}
    return jsonify(response)

@app.route("/scatter_plot/<x_category>/<int:year>")
def Pull_plot(x_category, year):
    pull_data = worldMap.scatter_plot(x_category, year)  
    response = {
            "year": pull_data['year'],
            "x_category": pull_data['x_category'],
            "x_data": list(pull_data['x_data']),
            "y_category": pull_data['y_category'],
            "y_data": list(pull_data['y_data']),
            "line_eq": pull_data['line_eq'],
            "reg_values": list(pull_data['reg_values']),
            "countries": list(pull_data['countries']),
            "r_value": pull_data['r_value'],
            "p_value": pull_data['p_value']
            }
    return jsonify(response)

@app.route("/line_plot/<country>")
def Line_plot(country):
    data = worldMap.time_plot(country)
    response ={
        "country": country,
        "x_data": list(data["x_data"]),
        "y_data": list(data["y_data"])
    }
    return jsonify(response)