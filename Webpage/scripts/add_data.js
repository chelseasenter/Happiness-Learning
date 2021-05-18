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
    // function to push to flask
    SubmitData(country, govt, free, howhapp, gen);
    console.log(free)
}

d3.select("#newentry").on("click", ImportData)