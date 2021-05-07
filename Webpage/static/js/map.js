var poly_link = "http://127.0.0.1:5000/";

// Use this link to get the geojson data.
// var poly_link = "static/data/new.geojson";

// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
  center: [0, 0],
  zoom: 2
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Determine min & max happiness_score
// Would like to do this with JS function
var max = 7.842;
var min = 2.523;


// Function to determine color based on score


function chooseColor(score) {
  if (score > max*0.9) {
    return "green";
  } else if (score > max*0.75) {
    return 'yellow';
  } else if (score > max*0.25) {
    return 'orange';
  } else {
    return "red"
  }
};


// Grabbing our GeoJSON data..
d3.json(poly_link).then( function(data) {
  
  console.log(data)
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function
        fillColor: chooseColor(feature.properties.happiness_score),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
          // layer.bindTooltip(feature.properties.ADMIN, { 'noHide': true })
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        // click: function(event) {
        //   myMap.fitBounds(event.target.getBounds());
        // }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.ADMIN + "</h1> <hr> <h3>" 
        + 'Happiness Score: ' + feature.properties.happiness_score + "</h3> <h3>" 
        + 'Happiness Rank: ' + feature.properties.happiness_rank + '</h3> <h3>'
        + 'GDP per Capita: ' + feature.properties.economy_gdp_per_capita + '</h3> <h3>'
        + 'Life Expectancy: ' + feature.properties.health_life_expectancy + '</h3> <h3>'
        + 'Freedom: ' + feature.properties.freedom + '</h3> <h3>'
        + 'Government Corruption: ' + feature.properties.trust_government_corruption + '</h3> <h3>'
        + 'Generosity: ' + feature.properties.generosity + '</h3>');


    }
  }).addTo(myMap);
});

