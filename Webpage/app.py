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

# sample comment