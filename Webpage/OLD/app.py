# from flask import Flask, render_template, redirect, url_for, request, jsonify
# import backend
# from flask_cors import CORS, cross_origin

# app = Flask(__name__)

# CORS(app, resources={
#     r"/*": {
#         "origins": "*"
#     }
# })
# app.config['CORS_HEADERS'] = 'Content-Type'
# app.config['CORS_ORIGINS'] = '*'
# app.config['DEBUG'] = True

# worldMap = backend.WorldMap()

# @app.route('/', methods=['GET', 'POST'])
# # No action needed here. Just display index.
# def index():
#     map_data = worldMap.mapJson()
#     return jsonify(map_data)

# @app.route("/scatter_plot")
# def Pull_plot():
#     pull_data=worldMap.scatter_plot()  
#     return jsonify(pull_data)

# @app.route("/year_list")
# def year_list():
#     # getting data
#     data = range(2015, 2022)
#     data = list(data)
#     response = {"years": data}
#     return jsonify(response)

# @app.route("/country_list")
# def country_list():
#     # getting data
#     data = worldMap.get_countries()
#     response = {"country": data}
#     return jsonify(response)

# @app.route("/x_category")
# def x_category():
#     # getting data
#     data = worldMap.get_x_categories()
#     response = {"x_categories": data}
#     return jsonify(response)

# @app.route("/scatter_plot/<x_category>/<int:year>")
# def Pull_plot(x_category, year):
#     pull_data=worldMap.scatter_plot(x_category, year)  
#     return jsonify(pull_data)

# # https://www.askpython.com/python-modules/flask/flask-forms
# # @app.route("/correlation", methods = ['POST', 'GET'])
# # def correlation():
# #     if request.method == 'GET':
# #         return f"The URL /data is accessed directly. Try going to '/form' to submit form"
# #     if request.method == 'POST':
# #         form_data = request.form
# #         return render_template('data.html',form_data = form_data)


# # @app.route("/line")
# # def line():
# #     mars = mongo.db.mars
# #     mars_data = scrape_mars.scrape_all()
# #     mars.update({}, mars_data, upsert=True)
# #     return render_template("line.html", mars=mars)



# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, render_template, redirect, url_for, request, jsonify
import backend
from flask_cors import CORS, cross_origin

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

# @app.route("/scatter_plot/<country>/<int:year>")
# def Pull_plot(country, year):
#     pull_data = worldMap.scatter_plot(country, year)  
#     return jsonify(pull_data)

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

# https://www.askpython.com/python-modules/flask/flask-forms
# @app.route("/correlation", methods = ['POST', 'GET'])
# def correlation():
#     if request.method == 'GET':
#         return f"The URL /data is accessed directly. Try going to '/form' to submit form"
#     if request.method == 'POST':
#         form_data = request.form
#         return render_template('data.html',form_data = form_data)
# @app.route("/line")
# def line():
#     mars = mongo.db.mars
#     mars_data = scrape_mars.scrape_all()
#     mars.update({}, mars_data, upsert=True)
#     return render_template("line.html", mars=mars)
if __name__ == "__main__":
    app.run(debug=True)