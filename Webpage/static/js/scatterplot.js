


// thinking that I can manually place the data via the url link in the 
var url = "http://127.0.0.1:5000/";

function init() {
  // Don't need these below but they could be used in a dynamic manner instead of
  // manually inserting the parameters via the queryUrl


  // var dropdownMenu = d3.select("#selDataset1");
  // // Assign the value of the dropdown menu option to a variable
  // var yearSelected = dropdownMenu.property("value");

  // // Picking and assigning the x_category
  // var dropdownMenu = d3.select("#selDataset2");
  // var xcategorySelected = dropdownMenu.property("value");

  // "http://127.0.0.1:5000/scatter_plot_year"
  // "http://127.0.0.1:5000/scatter_plot_x_category"
  queryUrl = url + "/scatter_plot/" + "economy_gdp_per_capita" + "/" + "2015";
  console.log(queryUrl);

  d3.json(queryUrl).then(function (response) {
    var x_data = response.x_data;
    var y_data = response.y_data;
    const words = response.x_category.split("_");
    x_category = words.map((word) => {
      if (word == "gdp") {
        return word.toUpperCase();
      } else if (word == "per") {
        return word;
      } else {
        return word[0].toUpperCase() + word.substring(1);
      };
    }).join(" ");
    var reg_values = response.reg_values;
    var line_eq = response.line_eq;
    var countries = response.countries;
    var year = response.year;
    var rvalue = response.r_value.toFixed(2);

    var trace1 = {
      x: x_data,
      y: y_data,
      mode: 'markers',
      type: 'scatter',
      name: `Countries`,
      color: rvalue,
      text: countries
    };
    var trace2 = {
      x: x_data,
      y: reg_values,
      mode: 'lines',
      type: 'line',
      name: `Regression:<br>${line_eq}`
    };
    var layout = {
      title: {
        text: `${year} Happiness Score vs ${x_category}: r-value = ${rvalue}`
      },
      xaxis: {
        title: {
          text: `${x_category}`,
          font: {
            family: 'Helvetica, sans-serif',
            size: 18,
            color: '#000000'
          }
        }
      },
      yaxis: {
        title: {
          text: "Happiness Score",
          font: {
            family: 'Helvetica, sans-serif',
            size: 18,
            color: '#000000'
          }
        }
      }
    };
    data = [trace1, trace2];
    var config = { responsive: true };

    Plotly.newPlot("plot", data, layout, config);

    // append options to the year dropdown
    d3.json(url + "/year_list").then(function (data) {
      // do d3 append option into dropdown menu
      var years = data.years;
      var dropdown = d3.select("#selDataset1");
      for (var i = 0; i < years.length; i++) {
        dropdown.append("option").attr('value', years[i]).text(years[i]);
      }
    })

    //do the same as before for countries
    d3.json(url + "/x_category").then(function (data) {
      // do d3 append option into dropdown menu
      var x_underscore_category = data.x_categories;
      var dropdown = d3.select("#selDataset2");
      for (var i = 0; i < x_underscore_category.length; i++) {
        const base = x_underscore_category[i].split("_");
        x_category = base.map((word) => {
          if (word == "gdp") {
            return word.toUpperCase();
          } else if (word == "per") {
            return word;
          } else {
            return word[0].toUpperCase() + word.substring(1);
          };
        }).join(" ");
        dropdown.append("option").attr('value', x_underscore_category[i]).text(x_category)
      }
    });
  })
};

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset1").on("change", updatePlotly);

d3.selectAll("#selDataset2").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {

  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset1");
  // Assign the value of the dropdown menu option to a variable
  var yearSelected = dropdownMenu.property("value");

  // Picking and assigning the x_category
  var dropdownMenu = d3.select("#selDataset2");
  var xcategorySelected = dropdownMenu.property("value");

  // "http://127.0.0.1:5000/scatter_plot_year"
  // "http://127.0.0.1:5000/scatter_plot_country"
  queryUrl = url + "/scatter_plot/" + xcategorySelected + "/" + yearSelected

  d3.json(queryUrl).then(function (response) {
    var x_data = response.x_data
    var y_data = response.y_data
    const x_category_base = response.x_category.replaceAll("_", " ")
    const words = x_category_base.split(" ");
    x_category = words.map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    }).join(" ");

    var reg_values = response.reg_values;
    var line_eq = response.line_eq;
    var countries = response.countries;
    var year = response.year;
    var rvalue = response.r_value.toFixed(2);
    // update = {
    //   x: [x_data],
    //   y: [y_data],
    //   type: 'scatter',
    //   marker: {size: 12}
    // };
    var trace1 = {
      x: x_data,
      y: y_data,
      mode: 'markers',
      type: 'scatter',
      name: 'Countries',
      color: rvalue,
      text: countries
    };
    var trace2 = {
      x: x_data,
      y: reg_values,
      mode: 'lines',
      type: 'line',
      name: `Regression:<br>${line_eq}`
    }
    var layout = {
      title: {
        text: `${year} Happiness Score vs ${x_category}: r-value= ${rvalue}`
      },
      xaxis: {
        title: {
          text: `${x_category}`,
          font: {
            family: 'Helvetica, sans-serif',
            size: 18,
            color: '#000000'
          }
        }
      },
      yaxis: {
        title: {
          text: "Happiness Score",
          font: {
            family: 'Helvetica, sans-serif',
            size: 18,
            color: '#000000'
          }
        }
      }
    }
    data = [trace1, trace2];
    // var x = response.x_data
    // var y = response.y_data
    // var x_title = response.x_category
    // var y_title = response.y_category
    // data = [x, y]
    Plotly.react("plot", data, layout);
  });
}
init(
);