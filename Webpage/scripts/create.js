var url = "http://127.0.0.1:5000/";
var points = 40;
var xarray = ['economy_gdp_per_capita', 'health_life_expectancy', 'freedom', 'trust_government_corruption', 'generosity'];
var newx = [];
var namearray = [];
var pointsarray = [];
var allowtext = d3.select("#allowance").attr("text");
console.log(allowtext)
var allowvalue = d3.select("#allowance").attr("value")
console.log(allowvalue)

var econ = d3.select("#economy_gdp_per_capita")
var health = d3.select("#health_life_expectancy")
var free = d3.select("#freedom")
var trust = d3.select("#trust_government_corruption")
var gener = d3.select("#generosity")
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
};


class CategoryLevel {
    constructor(category) {
        this.category = category;
        this.name = FormatCats(category);
        this.score = 0;
        //might need to pass in a index here for the graph//
    }

    // addition(amount) {
    //     this.score += amount;
    //     allowance -= allowance;
    // }

    change(amount) {
        var allowance = Number(allowtext);
        this.score -= amount;
        allowance += amount;
        d3.select("#allowance").attr("text", `${allowance}`)
    }
};



//A funciton to update the arrays with the new values

function CreateArrays() {
    for (let i = 0; i < xarray.length; i++) {

        newx.push(new CategoryLevel(xarray[i]));
        namearray.push(new CategoryLevel(xarray[i]).name);
        pointsarray.push(new CategoryLevel(xarray[i]).score);
    };
};
CreateArrays();



function init() {
    var url = "http://127.0.0.1:5000/";

    querlUrl = url + "insert the correct query"

    // Establishing allowance as a variable that can be changed //
    // var allowance = d3.select("#allowance").attr("value");
    // var economy = econ.value()

    //Constructs an object for each of the categories, setting their scores to 0

    //Empty arrays to push the object data to in order to plotly

    xarray.forEach(cats => new CategoryLevel(cats));


    // var namearray = [["Economy", "GDP", "per", "Capita"], ["Health", "Life", "Expectancy"], ["Freedom"], ["Trust", "Government", "Corruption"], ["Generosity"]

    var data = [
        {
            x: namearray,
            y: pointsarray,
            type: 'bar'
        }
    ];

    var layout = {
        paper_bgcolor: "#073642",
        plot_bgcolor:"#073642",
        font: {
            color:"#bb9625",
        },
        yaxis: {
            range: [0, 40],
            title: {
                text: "Your Selection",
                standoff: 20
            }
        },
        xaxis: {
            labels: {
                rotate: 127
            }
        }
    };


    Plotly.newPlot('myBar', data, layout, { responsive: true });




};
// var gdp = document.getElementById(".economy_gdp_per_capita").value;
// console.log(gdp);
// var allscore = d3.select("input").value
// console.log(allscore)
function updateScore(catchanged, num) {
    // if (d3.select(`#${catchanged}`) > newx.score)
    //sum all of the scores and make sure it is not over 40
    //might should be a function outside of Updatescore
    console.log("updateScore is running")
    console.log(CategoryLevel(catchanged.score))
    var catoldscore = newx[num].score;
    var catnewscore = Number(d3.select(`#${xarray[num]}`).node().value);
    var scorechange = catoldscore - catnewscore;
    newx[num].change(scorechange)
    console.log(catchanged);

    var sumpoints = 0;
    var xscore = 0;
    sumpoints += points;
    for (let i = 0; i < xarray.length; i++) {
        xscore = Number(d3.select(`#${xarray[i]}`).node().value)
        sumpoints += xscore
    };
    //if over
    // if (sumpoints > 40) {
    //     //show hidden box saying you've used too much
    // } else if (sumpoints )
    //if under
    //determine which element was changed
};


var econ = d3.select("#economy_gdp_per_capita")
var health = d3.select("#health_life_expectancy")
var free = d3.select("#freedom")
var trust = d3.select("#trust_government_corruption")
var gener = d3.select("#generosity")

function UpdateMax() {
    for (let i = 0; i < xarray.length; i++) {
        console.log(Number(econ.node().value));
        var max = 40 - Number(econ.node().value) - Number(health.node().value) - Number(free.node().value) - Number(trust.node().value) - Number(gener.node().value) + Number(d3.select(`#${xarray[i]}`).node().value);
        console.log(max);
        d3.select(`#${xarray[i]}`).attr({ "max": `${Number(max)}` });
    }
};

function ReactPlot() {
    pointsarray = []
    for (let i = 0; i < xarray.length; i++) {
        pointsarray.push(d3.select(`#${xarray[i]}`).node().value);
    };
    console.log(pointsarray);

    var data = [
        {
            x: namearray,
            y: pointsarray,
            type: 'bar'
        }
    ];

    var layout = {
        paper_bgcolor: "#073642",
        plot_bgcolor:"#073642",
        font: {
            color:"#bb9625",
        },
        yaxis: {
            range: [0, 40],
            title: {
                text: "Your Selection",
                standoff: 20
            }
        },
        xaxis: {
            labels: {
                rotate: 0
            }
        }
    };
    Plotly.react('myBar', data, layout);
    
};

function SetAllowance() {
    var allowval = 40 - Number(econ.node().value) - Number(health.node().value) - Number(free.node().value) - Number(trust.node().value) - Number(gener.node().value);
    d3.select("#allowance").text(`${allowval}`);
}


function NewUpdateScore() {
    var whatchange = d3.select(this);
    // console.log(whatchange)
    console.log(whatchange.node().value);
    var num = whatchange.node().value;
    var changeid = whatchange.attr("id");
    ReactPlot();
    SetAllowance();
    UpdateMax(changeid, num);
    // updateScore(changeid, num)
}

// On the change of a value UpdateScore
econ.on("change", NewUpdateScore);
health.on("change", NewUpdateScore);
free.on("change", NewUpdateScore);
trust.on("change", NewUpdateScore);
gener.on("change", NewUpdateScore);

function outputScore() {
    //function to pull the values from each object and create a json query to pull them from flask route
    var econval = Number(econ.node().value)
    var healthval = Number(health.node().value)
    var freeval = Number(free.node().value)
    var trustval = Number(trust.node().value)
    var generval = Number(gener.node().value)
    var sum = econval + healthval + freeval + trustval + generval;
    if (sum === 40) {
        var queryurl = url + `/imaginary_country/${econval}/${healthval}/${freeval}/${trustval}/${generval}`
        d3.json(queryurl).then(function (response) {
            console.log(response);
            var level = response["level"];
            var nearest = response["nearest"];
            var prediction = response["prediction"];
            d3.select("#happscore").text(`${prediction} ${level}`)
            d3.select("#country").text(`${nearest}`)
            d3.select(".results").node().style.visibility = "visible";
            d3.select("#message").node().style.visibility = "hidden";
        })
    } else {
        d3.select("#message").node().style.visibility = "visible";
        d3.select(".results").node().style.visibility = "hidden";
    }
    //return the value into d3 select happscore and update
    // return the country that also has the closest attributes to the user's country
};
d3.select("#submit").on("click", outputScore);

init(
);
// CreateObjects();







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




// var tablecat = d3.select(".scorebuttons");
    //Tried to automate the table in HTML but d3 doesn't work
    // newx.forEach(element =>
    //     tablecat.append("trow")
    //         .append("td").text(`${element.name}`)
    //         // .append("td").append("button").attr("class", "plussign").text("+")
    //         .append("input").attr("id", `${ element.category }`).attr("type", "number").attr("min", "0").attr("max", "40").attr("value", "0")
    //     // .append("td").append("button").attr("class", "minussign").text("-")
    // );

    // tablecat.append("button").attr("id", "submit").text("Submit");