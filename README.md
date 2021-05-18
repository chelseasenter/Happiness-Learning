# About this Project
## Why this topic?
Happiness prediction is a valuable resource. If machine learning could predict the general happiness of a country based on certain characteristics of that country, we could then use this tool to improve living in those countries or future developments. Understanding what makes people happy goes a long way in contributing to a functioning society.

## Purpose
The purpose of this project was to use previously collected data on countries and their happiness scores to see if we could predict how happy someone would be in a country they created based on the parameters collected in the original data. Additionally, we wanted to give users the opportunity to add their own data to our dataset to further educate our machine learning model for (hopefully) more accurate predictions

Peep the Github!

## Machine Learning: Training and Testing
### Training
Data used for training this Machine Learning algorithm originated from the World Happiness Report. The data was reviewed and processed through data cleaning to ensure quality data inputs. Since Linear Regressions don't require the typical 80/20 Train/Test split, we used all data to determine regression coefficients.

### Testing
For Linear Regressions the accuracy of the prediction algorithm can be measured by R2 value: 0.647

## Project Challenges
### Data Cleaning
Data cleaning consisted of several steps:

- Import
- Column name rectification
- Converting all strings to lowercase
- Normalizing calculation of values
- Concatenation of data sources
- Dropping rows with missing data
- Resetting indicies

### Machine Learning Models
This project considered 2 machine learning algorthm posssiblities: Linear Regression & Elastic Net. The prediction accuracy with both algorithms was similar. Linear Regression was chosen for simplicity. Prediction accuracy was best at 65%. Not bad for our first machine learning project, but perhaps we could've used a better model or our data may have limited us in ways we didn't anticipate. Having data on the participants instead of the countries may have given us more flexibility.

## Data Origins: The World Happiness Reports
The World Happiness Reports are a collection of yearly reports looking at countries, some national statistics (GDP, life expectancy, etc.), and population responses (trust in government, generosity, happiness, etc.) to create a happiness "rating" (or score) for each country.

