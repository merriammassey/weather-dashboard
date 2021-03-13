$(document).ready(function() {

// capture form input
var searchButton = document.querySelector("#location-submit");

// add event listeners to forms
searchButton.addEventListener("click", formSubmitHandler);
});

// a function that can be called when the page loads for everything in local storage

// a function that creates one button
var makeCityButtons = function(location) {
    //target the div to append buttons to
    var buttonsEl = document.querySelector("#city-buttons");
    //make city button
    var city = document.createElement("button");
    buttonsEl.appendChild(city);
    //city.classList.add("col-md-3");
    //city.classList.add("i:hover");
    city.innerText = location;
    console.log("make buttons");
    //add event listener
    city.addEventListener("click", formSubmitHandler);
    //clear out the name
    var locationEl = document.querySelector("#location");
    locationEl.value = "";
}

var displayData = function(data, location) {
    //display the date
    //var date = luxon.DateTime.now();
    //$("#date").text(date.toLocaleString(luxon.DateTime.DATE_SHORT));
    //display current data
    console.log(data.current.temp)
    //$("#temp").text("Temperature: " + data.current.temp + "F");
    //$("#humidity").text("Humidity: " + data.current.humidity + "%");
    document.querySelector("#city-date").innerHTML = location + " " + luxon.DateTime.now().toLocaleString(luxon.DateTime.DATE_SHORT);
    document.querySelector("#current-temp").innerHTML = "Temperature: " + data.current.temp + "F";
    document.querySelector("#current-humidity").innerHTML = "Humidity: " + data.current.humidity + "%";
    document.querySelector("#current-wind").innerHTML = "Wind Speed: " + data.current.weather.wind_speed + "mph";
    document.querySelector("#current-uv").innerHTML = "UV Index: " + data.current.uvi;
    // display 5 day forecast
    document.querySelector("#day-one-date").innerHTML = luxon.DateTime.now().plus({ days: 1 }).toLocaleString(luxon.DateTime.DATE_SHORT);
    document.querySelector("#one-temp").innerHTML = "Temperature: " + data.daily[1].temp.day+ "F";
    document.querySelector("#one-humidity").innerHTML = "Humidity: " + data.daily[1].humidity + "%";

}
var storedCitiesArray = [];

var getWeatherData = function(location, latlng) {
    // use lat long and change units to imperial
    fetch("https://api.openweathermap.org/data/2.5/onecall?"+latlng+"&appid=3facb0dc69ce03b89e13bc8c8ec66d00&units=imperial").then(function(response) {
        var data = response.json().then(function(data) {
          console.log(data);
          displayData(data, location);

          //get array or create one if there is none
        var storedCities = JSON.parse(localStorage.getItem("storedCities"));
        //if this array has anything in it, replace storedCities array 
        if(storedCities) {
            storedCitiesArray = storedCities;
        }
        //var storedCitiesArray = localStorage.getItem("storedCities");
          
            //if the array doesn't include this location
            if(!storedCitiesArray.includes(location, 0)){
                console.log("array doesn't have this location");
                // add this location to the array
                console.log(typeof(storedCitiesArray));
                console.log(storedCitiesArray);
                storedCitiesArray.push(location);

                //replace the stored array "storedCities" with one with the new location 
                localStorage.setItem("storedCities", JSON.stringify(storedCitiesArray));
                console.log("location is now stored");
                // make a button for the left column
                makeCityButtons(location);
            //} else {
            // if the location exists in the array in local storage, do not make a button
            //if(localStorage.getItem(location)){
            //    console.log("location is already stored");
            // if the locatino is not in local storage, put it there
            //} else {
            //    localStorage.setItem(location, latlng);
                
                //and make a city button
                // make city buttons and append them but make this replicable  
            }
        });
    });

    
    // add event listeners to forms
    //buttonsEl.addEventListener("submit", formSubmitHandler);
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
        getWeatherData(location, latlng);
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

    
    } else {
    alert("Please enter a location");
    
    
 };
}
//getLocation();
