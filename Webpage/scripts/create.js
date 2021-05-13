var url = "http://127.0.0.1:5000/";

querlUrl = url + "insert the correct query"

// Establishing allowance as a variable that can be changed //
var allowance = d3.select("#allowancebox").attr("value")

var xarray = ['economy_gdp_per_capita', 'health_life_expectancy', 'freedom', 'trust_government_corruption', 'generosity'];

// Creating an even on the click of the plus or minus sign //
d3.selectAll(#plussign).on("click", CategoryLevel.addition);

d3.selectAll(#minussign).on("click", CategoryLevel.subtraction);


class CategoryLevel{
    constructor(category){
        this.category = category;
        this.score = 0;
        //might need to pass in a index here for the graph//
    }

    addition(amount){
        this.score += amount;
        allowance -= allowance;
    }

    subtraction(amount){
        this.score -= amount;
        allowance += allowance
    }
};

var data = [
    {
      x: xarray,
      y: [0, 0, 0, 0, 0],
      type: 'bar'
    }
  ];
  
  Plotly.newPlot('myBar', data);

  // Update Plotly to update the score for each bar when adding or subtracting score //
  