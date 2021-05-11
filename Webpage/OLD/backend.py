import sqlalchemy
import pandas as pd
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from config import password
import json
from scipy import stats



class WorldMap:
    """username = "postgres" 
    Base = automap_base()

    engine = create_engine(f'postgresql://{username}:{password}@localhost:5432/Project-2')

    Base.prepare(engine, reflect=True)
"""
    def __init__(self):
        # From Heroku credentials
        username = "wnpdgutwqozkwm" 
        Base = automap_base()

        self.engine = create_engine(f'postgres://{username}:{password}@ec2-3-211-37-117.compute-1.amazonaws.com:5432/d4rg5ld0gedobs')

        Base.prepare(self.engine, reflect=True)
    def mapJson(self):
        world_data = pd.read_sql(f"SELECT * FROM public.happiness_data WHERE year = 2021;", con=self.engine)   
        # load json to be edited
        with open('static/data/countries.geojson') as f:
            data = json.load(f)

        # Create list of all countries in happiness_data
        hap_countries = world_data['country'].values.tolist()

        for i in range(len(data['features'])):
        
            country = data['features'][i]['properties']['ADMIN']
        
            if country in hap_countries:
            
                #add happiness_score
                hapScore = str(world_data['happiness_score'].loc[world_data['country'] == country])
                hap = hapScore.split()
                score = hap[1]

                data['features'][i]['properties']['happiness_score'] = float(score)
                
                #add happiness_rank
                hapRank = str(world_data['happiness_rank'].loc[world_data['country'] == country])
                hapr = hapRank.split()
                rank = hapr[1]
                
                data['features'][i]['properties']['happiness_rank'] = float(rank)
                
                #add economy_gdp_per_capita
                GDP = str(world_data['economy_gdp_per_capita'].loc[world_data['country'] == country])
                gdp = GDP.split()
                val = gdp[1]
                
                data['features'][i]['properties']['economy_gdp_per_capita'] = float(val)
                
                #add health_life_expectancy
                HLE = str(world_data['health_life_expectancy'].loc[world_data['country'] == country])
                hle = HLE.split()
                st = hle[1]
                
                data['features'][i]['properties']['health_life_expectancy'] = float(st)
                
                
                #add freedom
                freedom = str(world_data['freedom'].loc[world_data['country'] == country])
                freed = freedom.split()
                free = freed[1]
                
                data['features'][i]['properties']['freedom'] = float(free)
                
                
                #add trust_government_corruption
                TGC = str(world_data['trust_government_corruption'].loc[world_data['country'] == country])
                TG = TGC.split()
                T = TG[1]
                
                data['features'][i]['properties']['trust_government_corruption'] = float(T)
                
                        
                #add generosity
                generosity = str(world_data['generosity'].loc[world_data['country'] == country])
                gener = generosity.split()
                gen = gener[1]
                
                data['features'][i]['properties']['generosity'] = float(gen)

        return data

    def get_countries(self):
        countries_df = pd.read_sql(f"SELECT country FROM happiness_data", con=self.engine)
        countries = list(countries_df["country"].unique())
        return countries
    
    
    def get_x_categories(self):

        x_category_list = ["economy_gdp_per_capita", "health_life_expectancy", "freedom", "trust_government_corruption", "generosity"]

        return x_category_list

    def scatter_plot(self, x_category, year):
        
        # Requesting the the data from the database
        scat_df = pd.read_sql(f"SELECT country, happiness_score, {x_category} FROM happiness_data WHERE year = {year}", con=self.engine)
        scat_df_json = scat_df.to_json()
        # creating the scatter plot  and regression line which I'm not sure if it's necessary
        # fig = px.scatter(scat_df, x=x_category, y="happiness_score", trendline="ols")
            
        # getting slope, r and p values to print later
        (slope, intercept, rvalue, pvalue, stderr) = stats.linregress(scat_df[x_category], scat_df["happiness_score"])
            
        # creating a line equation
        reg_values = scat_df[x_category] * slope + intercept
        line_eq = "y = " + str(round(slope,2)) + "x + " + str(round(intercept,2))
        y_data = scat_df["happiness_score"]
        x_data = scat_df[x_category]
        countries = scat_df["country"]
        # adding an annotation of the slope of the line on the figure
            
         #  So here I would append each variable and graph into a dictionary or json where the next python code can access? 
        #  How would I call each dictionary a  uniqu name? or I don't need to?
        col_dictionary = {
            "year": year,
            "x_category": x_category,
            "x_data": x_data,
            "y_category": "happiness_score",
            "y_data": y_data,
            "line_eq": line_eq,
            "reg_values": reg_values,
            "countries": countries,
            "r_value": rvalue,
            "p_value": pvalue
            }
        return(col_dictionary)
        
    def time_plot(self, country):
        time_df = pd.read_sql(f"SELECT country, happiness_score, year FROM happiness_data", con=self.engine)
        x_data = time_df[time_df["country"] == country]["year"]
        print(x_data)
        y_data = y_data = time_df[time_df["country"] == country]["happiness_score"]
        time_dict = {
            "country": country,
            "x_data": x_data,
            "y_data": y_data
        }
        return(time_dict)

# DO NOT DELETE
    #     regression_dict = {}
    #     col_dictionary = {}
    #     # year = 2021
    #     x_headers = ["economy_gdp_per_capita", "health_life_expectancy", "freedom", "trust_government_corruption", "generosity"]
    #     for x_category in x_headers:
        
    #     # Requesting the the data from the database
    #         scat_df = pd.read_sql(f"SELECT happiness_score, {x_category} FROM happiness_data WHERE year = {year}", con=self.engine)
    #         scat_df_json = scat_df.to_json()
    #         # creating the scatter plot  and regression line which I'm not sure if it's necessary
    #   #      fig = px.scatter(scat_df, x=x_category, y="happiness_score", trendline="ols")
            
    #         # getting slope, r and p values to print later
    #         (slope, intercept, rvalue, pvalue, stderr) = stats.linregress(scat_df[x_category], scat_df["happiness_score"])
            
    #         # creating a line equation
    #         line_eq = "y = " + str(round(slope,2)) + "x + " + str(round(intercept,2))
    #         y_data = scat_df["happiness_score"].to_json(orient="records")
    #         x_data = scat_df[x_category].to_json(orient="records")
    #         # adding an annotation of the slope of the line on the figure
            
    #         #  So here I would append each variable and graph into a dictionary or json where the next python code can access? 
    #         #  How would I call each dictionary a  uniqu name? or I don't need to?
    #         col_dictionary[x_category] = {
    #             "x_category": x_category,
    #             "x_data": x_data,
    #             "y_category": "happiness_score",
    #             "y_data": y_data,
    #             "line_eq": line_eq,
    #             }
            
    #     regression_dict[year] = col_dictionary
    #     #json.dumps(regression_dict)
    #     return json.dumps(regression_dict)


# CAN DELETE**************************



# def pull2021Data(year):
#     world_data = pd.read_sql(f"SELECT * FROM happiness_data WHERE year = {year}")

# def pullData(year, x, y):
#     x_data = pd.read_sql(f"SELECT {x} FROM happiness_data WHERE year = {year}")
#     if x = yearly_average_temp:
#         x_data = pd.read_sql(f"SELECT {x}")
#     else if y= yearly_average_temp:
#         x_data = 
#     else:
#     x_data = pd.read_sql(f"SELECT {x} FROM happiness_data WHERE year = {year}")
#     y_data = pd.read_sql(f"SELECT happiness_score FROM happiness_data WHERE year = {year}")

    