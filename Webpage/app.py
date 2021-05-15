from typing import Counter
from flask import Flask, render_template, redirect, url_for, request, jsonify
from joblib import dump, load
from pickle import dump as dump_p, load as load_p
from flask_cors import CORS, cross_origin
import json

# For SQL Connect
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, insert

# From Heroku credentials
username = "wnpdgutwqozkwm" 
password = '490a8dd6d0a3f6a6c381300a185b23a3c3329d3bacc1d3717a5bf68e7351cd90'
Base = automap_base()

engine = create_engine(f'postgres://{username}:{password}@ec2-3-211-37-117.compute-1.amazonaws.com:5432/d4rg5ld0gedobs')

Base.prepare(engine, reflect=True)


app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_ORIGINS'] = '*'
app.config['DEBUG'] = True

@app.route('/', methods=['GET', 'POST'])
# No action needed here. Just display index.
def index():
   return 

@app.route('/imaginary_country/<econ_gdp>/<life_exp>/<freedom>/<govt_trust>/<generosity>')
def get_pred_happiness(econ_gdp, life_exp, freedom, govt_trust, generosity):
      
   
   # inverse scale happiness score with happiness scaler, store in variable
   # check if happiness is unhappy, happy, etc
   # return unscaled happiness score and qualitative result


   # Setting happiness levels
   unhappy = 2.523 #"Unhappy"
   low_happy = 3.85275 #"Low Happiness"
   mod_happy = 5.182499999999999 #"Moderately Happy"
   happy = 6.51225 #"Happy"
   ext_happy = 7.842 #"Extremely Happy"

   # LinRegress coeffs determined from Jupyter notebook
   coef_gdp = 1.211244050635855 
   coef_life = 1.707979044319649 
   coef_freedom = 1.9806188129473845 
   coef_corrupt = 1.9806188129473845 
   coef_generosity = 0.6536659939512272 
   intercept = 2.33466608

   # determine predicted happiness
   prediction = econ_gdp*coef_gdp + life_exp*coef_life + freedom*coef_freedom + govt_trust*coef_corrupt + generosity*coef_generosity + intercept
   
   # Detemine happiness level
   if prediction > happy:
      hap_level = "Extremely Happy"
   elif prediction > mod_happy:
      hap_level = "Happy"
   elif prediction > low_happy:
      hap_level = "Moderately Happy"
   elif prediction > unhappy:
      hap_level = "Low Happiness"
   else:
      hap_level = "Unhappy"


   # determine nearest country by happiness score
   with open('Webpage\data\country_happiness_score.json') as f:
      data = json.load(f)

   start = 10
   for key, value in data:
      delta = prediction - value

      if delta < start:
         start = delta
         nearest = key
   


   response = {"prediction": prediction, "level": hap_level, "nearest": nearest}


   return jsonify(response)


@app.route('/FTM/<cntry>/<econ_gdp>/<life_exp>/<frdm>/<govt_trust>/<generosity>')
def store_FTM(cntry,econ_gdp, life_exp, frdm, govt_trust, gnrsty):

   try:
   
      conn = engine.connect()
      
      stmt = (
         insert('feed_the_machine'). #table name
         values(country = cntry, econ_gdp_per_capita = econ_gdp, health_life_expectancy = life_exp, freedom = frdm, trust_government_corruption = govt_trust, generosity = gnrsty)
      )

      result = conn.execute(stmt)

      message = result
   except:
      message = 'An error occured'
   

   # store countries only for dropdown
   with open('Webpage\data\country_happiness_score.json') as f:
      data = json.load(f)

   countries = []
   for key in data:

      if key not in countries:
         countries.append(key)


   response = {"message": message, "countries": countries}

   return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)