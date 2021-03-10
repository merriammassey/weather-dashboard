/*var getWeatherData = function() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&appid=3facb0dc69ce03b89e13bc8c8ec66d00").then(function(response) {
        response.json().then(function(data) {
          console.log(data);
        });
    });
};
    //console.log("outside");
    
getWeatherData();
*/

// on search button validate user input
var getLocation = function() {
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDjPtZ4p5lg5rNZd4ZphD2Sdk3OPaCKryQ").then(function(response) {
        response.json().then(function(data) {
          console.log(data);
        });
    });
};
    //console.log("outside");
    
getLocation();

