// var url = "http://127.0.0.1:5000/";


// d3.json(url + "/countries").then(function (data) {
//     var dropdown = d3.select("selcont");
//     dropdown.append("option").attr("value", data.country).text(data.country);
// });

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
}

d3.select("#newentry").on("click", ImportData)