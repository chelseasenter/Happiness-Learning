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
  queryUrl = url + "/line_plot/" + "Switzerland";
  console.log(queryUrl);

  d3.json(queryUrl).then(function (response) {
    var x_data = response.x_data;
    var y_data = response.y_data;
    var country = response.country;

    var trace1 = {
      x: x_data,
      y: y_data,
      mode: 'lines',
    };

    var layout = {
      title: {
        text: `${country} Happiness Score Over Time`,
        font: {
          family: 'Helvetica, sans-serif',
          size: 24,
          color: '#000000'
        }
      },
      xaxis: {
        title: {
          text: 'Year',
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
      // width: 1000,
      // height: 750
    }

    data = [trace1];

    Plotly.newPlot("line-plot", data, layout);

    // append options to the year dropdown


    //do the same as before for countries
    d3.json(url + "/country_list").then(function (data) {
      // do d3 append option into dropdown menu
      var country_list = data.country;
      var dropdown = d3.select("#selCountry");
      for (var i = 0; i < country_list.length; i++) {
        dropdown.append("option").attr('value', country_list[i]).text(country_list[i]);
      }
    })
  })
}

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selCountry").on("change", updateLine);

// This function is called when a dropdown menu item is selected
function updateLine() {

  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selCountry");
  // Assign the value of the dropdown menu option to a variable
  var countrySelected = dropdownMenu.property("value");

  // "http://127.0.0.1:5000/scatter_plot_year"
  // "http://127.0.0.1:5000/scatter_plot_country"
  changeUrl = url + "/line_plot/" + countrySelected;

  d3.json(changeUrl).then(function (response) {
    var x_data = response.x_data;
    var y_data = response.y_data;
    var country = response.country;

    var trace1 = {
      x: x_data,
      y: y_data,
      mode: 'lines',
    };

    var layout = {
      title: {
        text: `${country} Happiness Score Over Time`,
        font: {
          family: 'Helvetica, sans-serif',
          size: 24,
          color: '#000000'
        }
      },
      xaxis: {
        title: {
          text: 'Year',
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
      // width: 1000,
      // height: 750
    }
    data = [trace1];
    Plotly.react("line-plot", data, layout);
    // Plotly.restyle("plot", "y", [y]);
  });
}
init();