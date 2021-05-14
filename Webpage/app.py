from flask import Flask, render_template, redirect, url_for, request, jsonify
from joblib import dump, load
from pickle import dump as dump_p, load as load_p
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_ORIGINS'] = '*'
app.config['DEBUG'] = True

app.route('/imaginary_country/<econ_gdp>/<life_exp>/<freedom>/<govt_trust>/<generosity>')
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
      


      response ={"prediction": prediction, "level": hap_level, "nearest": nearest}


      return jsonify(response)