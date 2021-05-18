var url = "http://127.0.0.1:5000/";



path = "data/country_happiness_score.json"
var countries = []
d3.json(path).then(function (data) {
    data.forEach(function (countrydata) {
        if ($.inArray(countrydata.country, countries) === -1) {
            countries.push(countrydata.country)
        };
    });
    countries.sort()
    AppendCont(countries);
});

//function for getting unique values in array


// for (let i = 0; i < country.length; i++) {
//     dropdown.append("option").attr("value", country[i]).text(country[i]);
// };

function AppendCont(data) {
    var dropdown = d3.select("#selcont");
    for (let i = 0; i < data.length; i++) {
        dropdown.append("option").attr("value", data[i]).text(data[i]);
    }
};


var scale = [1, 2, 3, 4, 5]
var tags = ["govt", "free", "howhapp", "gen"]

function AppendSel(tag) {
    var dropdown = d3.select(`#${tag}`);
    for (let i = 0; i < scale.length; i++) {
        dropdown.append("option").attr("value", scale[i]).text(scale[i]);
    }
};

function Tags() {
    for (let i = 0; i < tags.length; i++) {
        AppendSel(tags[i]);
    };
};
Tags();


function SubmitData(country, govt, free, howhapp, gen) {
    var queryurl = url + `FTM/${country}/${howhapp}/${free}/${govt}/${gen}`
    d3.json(queryurl).then(function (response) {
        console.log(response);
        // var message = response["message"];

        // d3.select("#happscore").text(`${prediction}`)
        // d3.select("#message").text(`${message}`)

    });
};

// function PushData(govt, free, howhapp, gen) {
//     var inputdict = {
//         government: govt,
//         freedom: free,
//         happiness: howhapp,
//         generosity: gen
//     };
//     $.post(url + "postmethod", {
//         javascript_data: inputdict
//     });

// };

//Nathan's way//
// function PushData(govt, free, howhapp, gen) {
//     console.log("PushData is happening")
//     d3.json(url + "/getmethod/<jsdata>",function(error, data) {})
//    .node().header("Content-Type","application/json")
//    .send("POST", JSON.stringify({
//         government: govt, 
//         freedom: free,
//         happiness: howhapp,
//         generosity: gen
//     }));
// }

function ImportData() {
    console.log("ImportData is happening")
    var country = d3.select("#selcont").node().value
    var govt = d3.select("#govt").node().value;
    var free = d3.select("#free").node().value;
    var howhapp = d3.select("#howhapp").node().value;
    var gen = d3.select("#gen").node().value;
    d3.select("#submitmessage").node().style.visibility = "visible";
    CountryPlot(country, howhapp);
    // function to push to flask
    SubmitData(country, govt, free, howhapp, gen);
    console.log(free)
}

function CountryPlot(country, howhapp) {
    // "http://127.0.0.1:5000/scatter_plot_year"
    // "http://127.0.0.1:5000/scatter_plot_country"
    changeUrl = url + "/line_plot/" + country;

    d3.json(changeUrl).then(function (response) {
        var x_data = response.x_data;
        var y_data = response.y_data;
        var country = response.country;

        var trace1 = {
            x: x_data,
            y: y_data,
            mode: 'lines',
            name: `${country}`
        };

        var trace2 = {
            x: [2021],
            y: [howhapp],
            mode: 'markers',
            name: 'Your Happiness Score'
        };

        var layout = {
            paper_bgcolor: "#073642",
            plot_bgcolor: "#073642",
            font: {
                color: "#bb9625",
            },
            title: {
                text: `${country} Happiness Score Over Time`,
                font: {
                    family: 'Helvetica, sans-serif',
                    size: 24,
                    color: "#bb9625"
                }
            },
            xaxis: {
                title: {
                    text: 'Year',
                    font: {
                        family: 'Helvetica, sans-serif',
                        size: 18,
                        color: "#bb9625"
                    },
                    dtick: '1'
                }
            },
            yaxis: {
                title: {
                    text: "Happiness Score",
                    font: {
                        family: 'Helvetica, sans-serif',
                        size: 18,
                        color: "#bb9625"
                    }
                }
            }
            // width: 1000,
            // height: 750
        }
        data = [trace1, trace2];
        Plotly.plot("timeplot", data, layout);
        // Plotly.restyle("plot", "y", [y]);
    });
}

d3.select("#newentry").on("click", ImportData)