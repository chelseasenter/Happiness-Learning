// var url = "http://127.0.0.1:5000/";



path = "data/country_happiness_score.json"
var countries = []
d3.json(path).then(function (data) {
    console.log(data);
    data.forEach(function(countrydata) {
    countries.push(countrydata.country)
    })
    AppendCont(countries);
});

console.log(countries)
    //function for getting unique values in array


// for (let i = 0; i < country.length; i++) {
//     dropdown.append("option").attr("value", country[i]).text(country[i]);
// };

function AppendCont(data) {
    var dropdown = d3.select("#selcont");
    for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        dropdown.append("option").attr("value", data[i]).text(data[i]);
        
    }
    console.log(data)
};


var scale = [0, 1, 2, 3, 4, 5]
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


function ImportData() {
    var govt = d3.select("#govt").node().value;
    var free = d3.select("#free").node().value;
    var howhapp = d3.select("#howhapp").node().value;
    var gen = d3.select("#gen").node().value;
    // function to push to flask
    console.log(free)
}

d3.select("#newentry").on("click", ImportData)