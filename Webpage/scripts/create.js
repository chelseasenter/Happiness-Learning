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
console.log(econ)
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

//A function to create the objects in variables (same as the newxarray)

// function CreateObjects() {
//     var economy_gdp_per_capita = new CategoryLevel('economy_gdp_per_capita');
//     var health_life_expectancy = new CategoryLevel('health_life_expectancy');
//     var freedom = new CategoryLevel('freedom');
//     var trust_government_corruption = new CategoryLevel('trust_government_corruption');
//     var generosity = new CategoryLevel('generosity');
// };
// CreateObjects();

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




    var data = [
        {
            x: namearray,
            y: pointsarray,
            type: 'bar'
        }
    ];

    var layout = {
        yaxis: {
            range: [0, 40],
            title: {
                text: "Your Score",
                standoff: 20
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
function NewUpdateScore() {
    var whatchange = d3.select(this);
    // console.log(whatchange)
    console.log(whatchange.node().value);
    var num = whatchange.node().value;
    var changeid = whatchange.attr("id")
}
econ.on("change", NewUpdateScore);

// econ.on("change", updateScore("economy_gdp_per_capita", 0));
health.on("change", updateScore("health_life_expectancy", 1));
free.on("change", updateScore("freedom", 2));
trust.on("change", updateScore("trust_government_corruption", 3));
gener.on("change", updateScore("generosity", 4));

function outputScore() {
    //function to pull the values from each object and create a json query to pull them from flask route
    console.log(allowtext)
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