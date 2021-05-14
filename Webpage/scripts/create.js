var points = 40;
var xarray = ['economy_gdp_per_capita', 'health_life_expectancy', 'freedom', 'trust_government_corruption', 'generosity'];

function init() {
    var url = "http://127.0.0.1:5000/";

    querlUrl = url + "insert the correct query"

    // Establishing allowance as a variable that can be changed //
    // var allowance = d3.select("#allowance").attr("value");
    var allowtext = d3.select("#allowance").attr("text");
    
    //A function to change the format of the categories names
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

    //Constructs an object for each of the categories, setting their scores to 0
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

    //Empty arrays to push the object data to in order to plotly
    newx = [];
    namearray = [];
    pointsarray = [];
    xarray.forEach(cats => new CategoryLevel(cats));
    for (let i= 0; i < xarray.length; i++) {
        
        newx.push(new CategoryLevel(xarray[i]));
        namearray.push(new CategoryLevel(xarray[i]).name);
        pointsarray.push(new CategoryLevel(xarray[i]).score);
    };

    var data = [
        {
            x: namearray,
            y: pointsarray,
            type: 'bar'
        }
    ];

    Plotly.newPlot('myBar', data, { responsive: true });

    var tablecat = d3.select(".scorebuttons");

    newx.forEach(element =>
        tablecat.append("trow")
            .append("td").text(`${element.name}`)
            // .append("td").append("button").attr("class", "plussign").text("+")
            .append("input").attr("class", `${ element.category }`).attr("type", "number").attr("min", "0").attr("max", "40")
        // .append("td").append("button").attr("class", "minussign").text("-")
    );

    tablecat.append("button").attr("id", "submit").text("Submit");


};

allscore = d3.selectAll("input")
function updateScore() {
    
    //sum all of the scores and make sure it is not over 40
    //might should be a function outside of Updatescore
    var sumpoints = 0
    sumpoints += points
    for (let i = 0; i < allscore.length; i++) {
        sumpoints += allscore[i].value
    };
    //if over
    //if under
    //determine which element was changed
};

allscore.on("change", updateScore)
console.log(allscore)

function outputScore(){
    //function to pull the values from each object and create a json query to pull them from flask route
    //return the value into d3 select happscore and update
    // return the country that also has the closest attributes to the user's country
};

d3.select("#submit").on("click", outputScore);
d3.selectAll("catscore");
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