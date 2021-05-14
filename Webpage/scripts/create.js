var points = 40;

function init() {
    var url = "http://127.0.0.1:5000/";

    querlUrl = url + "insert the correct query"

    // Establishing allowance as a variable that can be changed //
    // var allowance = d3.select("#allowance").attr("value");
    var allowtext = d3.select("#allowance").attr("text");
    var xarray = ['economy_gdp_per_capita', 'health_life_expectancy', 'freedom', 'trust_government_corruption', 'generosity'];
    var yarray = [0, 0, 0, 0, 0]


    var data = [
        {
            x: xarray,
            y: yarray,
            type: 'bar'
        }
    ];

    Plotly.newPlot('myBar', data, { responsive: true });

    var tablecat = d3.select(".scorebuttons");

    xarray.forEach(element =>
        tablecat.append("trow")
            .append("td").text(`${element}`)
            // .append("td").append("button").attr("class", "plussign").text("+")
            .append("input").attr("class", "catscore").attr("type", "number").attr("min", "0").attr("max", "40")
        // .append("td").append("button").attr("class", "minussign").text("-")
    );

    tablecat.append("button").attr("id", "submit").text("Submit");

    function FormatCats(name) {
        const base = name.split("_");
        x_category = base.map((word) => {
            if (word == "gdp") {
                return word.toUpperCase();
            } else if (word == "per") {
                return word;
            } else {
                return word[0].toUpperCase() + word.substring(1);
            };
        }).join(" ")
        return x_category;
    }
    console.log(xarray);


    class CategoryLevel {
        constructor(category) {
            this.category = category;
            this.name = FormatCats(category);
            this.score = 0;
            //might need to pass in a index here for the graph//
        }

        addition(amount) {
            this.score += amount;
            allowance -= allowance;
        }

        subtraction(amount) {
            this.score -= amount;
            allowance += allowance
        }
    };
    
    newx = [];
    xarray.map(cats => new CategoryLevel(cats));
    xarray.forEach(cats => new CategoryLevel(cats));
    for (let i= 0; i < xarray.length; i++) {
        newx.push(new CategoryLevel(xarray[i]))
    };

console.log(newx);

};

// d3.selectAll("catscore")
// Creating an even on the click of the plus or minus sign //
// d3.selectAll(".catscore").on("change", CategoryLevel.addition);

// d3.selectAll(#minussign).on("click", CategoryLevel.subtraction);



// Plotly.newPlot('myBar', data, {responsive: true});

// Update Plotly to update the score for each bar when adding or subtracting score //

//   class UpdatePlotly{
//     data = {
//         x: xarray,
//         y: yarray,
//         type: 'bar'
//       }  
//     Plotly.react('myBar', data)
//   }

init(
);