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