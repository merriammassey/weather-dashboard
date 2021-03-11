$(document).ready(function() {
    

// capture form input
var locationEl = document.querySelector("#location");
var searchButton = document.querySelector("#location-submit");

// add event listeners to forms
searchButton.addEventListener("click", formSubmitHandler);
});
 
var getWeatherData = function(latlng) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?"+latlng+"&appid=3facb0dc69ce03b89e13bc8c8ec66d00").then(function(response) {
        response.json().then(function(data) {
          console.log(data);
        });
    });
};
    //console.log("outside");
    
//getWeatherData();

// on search button validate user input - attach to button click
var getLocation = function(location) {
    //var location = "austin";
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+location+"&key=AIzaSyDjPtZ4p5lg5rNZd4ZphD2Sdk3OPaCKryQ").then(function(response) {
        response.json().then(function(data) {
          //console.log(data);
          //get lat long
        var latlng = "lat="+ data.results[0].geometry.location.lat+ "&lon=" +data.results[0].geometry.location.lng;
        console.log(latlng);
        getWeatherData(latlng);
        });
    });
};
    //console.log("outside");
    
// a function to handle the form input
var formSubmitHandler = function(event) {
    console.log("button was clicked");
    // prevent the event from bubbling up to next element
    event.preventDefault();

    // get value from input element and trim off any spaces
    var locationEl = document.querySelector("#location");
    var location = locationEl.value.trim();

    if (location) {
        //make a city button

        //run getWeatherData function on city button click

        // run getLocation and store data in a var
        // data is returned from getLocation but must be named with a var
        //var locationData = getLocation(location);
        
    getLocation(location);
    //console.log(latlng);

    //clear out the name
    locationEl.value = "";
    } else {
    alert("Please enter a location");
    }

 };

//getLocation();

