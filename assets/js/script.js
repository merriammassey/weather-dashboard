$(document).ready(function() {

// capture form input
var searchButton = document.querySelector("#location-submit");

// add event listeners to forms
searchButton.addEventListener("click", formSubmitHandler);

});
// a function that can be called when the page loads for everything in local storage

// function to display data from button name - pass it the event because it tells which button was clicked
var displayButtonData = function(click){
    //prevent the submission of a form
    click.preventDefault();
    var location = click.target.innerHTML;
    
    //show five day cards when button is clicked
    document.getElementById("five-day").style.display="flex";
    document.getElementById("current-conditions").style.display="inline";
    getLocation(location);
    return false;
}

// a function that creates one button
var makeCityButtons = function(location) {
    //target the div to append buttons to
    var buttonsEl = document.querySelector("#city-buttons");
    //make city button
    var city = document.createElement("button");
    buttonsEl.appendChild(city);
    city.setAttribute("type", "button");
    //city.classList.add("col-md-3");
    //city.classList.add("i:hover");
    //location = (location[0].toUpperCase() + location.substring(1));
    city.innerText = location;
    console.log("make buttons");
    //add event listener
    city.addEventListener("click", displayButtonData);
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
    //capitalize the first letter of each word
    location = location.split(" ");
        //(location[0].toUpperCase() + location.substring(1));
        for (let i = 0; i < location.length; i++) {
            location[i] = location[i][0].toUpperCase() + location[i].substr(1);
        }
        location = location.join(" ");
        console.log(location);
    //$("#temp").text("Temperature: " + data.current.temp + "F");
    //$("#humidity").text("Humidity: " + data.current.humidity + "%");
    var iconCode = data.current.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode +"@2x.png";
    document.querySelector("#icon").setAttribute("src", iconUrl);
    document.querySelector("#city-date").innerHTML = location + " " + luxon.DateTime.now().toLocaleString(luxon.DateTime.DATE_SHORT);  //set image source to ("http://openweathermap.org/img/wn/10d@2x.png") //data.current.weather[0].icon;
    document.querySelector("#current-temp").innerHTML = "Temperature: " + data.current.temp + "F";
    document.querySelector("#current-humidity").innerHTML = "Humidity: " + data.current.humidity + "%";
    document.querySelector("#current-wind").innerHTML = "Wind Speed: " + data.current.wind_speed + "mph";
    document.querySelector("#current-uv").innerHTML = "<p id='current-text'> UV Index: " + data.current.uvi + "</p>";
    
    if(data.current.uvi <=5) {
        document.querySelector("#current-text").setAttribute("style", "background-color: yellow;");
    } else if (data.current.uvi <=7) {
        document.querySelector("#current-text").setAttribute("style", "background-color: orange;");
    } else if (data.current.uvi <=10) {
        document.querySelector("#current-text").setAttribute("style", "background-color: red;");
    } else {
        document.querySelector("#current-text").setAttribute("style", "background-color: lavender;");
    }
    /*
    for (var i=0; i<5; i++) {
        var divEl = document.createElemement("div")
        divEl.classList.add("card", "text-white", "bg-primary", "mb-3");
        var date = document.createElement();
        date.innerHTML = 
    } */

    // display 5 day forecast
        document.querySelector("#date1").innerHTML = luxon.DateTime.now().plus({ days: 1}).toLocaleString(luxon.DateTime.DATE_SHORT);
        document.querySelector("#temp1").innerHTML = "Temperature: " + data.daily[1].temp.day+ "F";
        document.querySelector("#humidity1").innerHTML = "Humidity: " + data.daily[1].humidity + "%";
        var iconCode = data.daily[1].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + iconCode +"@2x.png";
        document.querySelector("#icon1").setAttribute("src", iconUrl);
    
        document.querySelector("#date2").innerHTML = luxon.DateTime.now().plus({ days: 2}).toLocaleString(luxon.DateTime.DATE_SHORT);
        document.querySelector("#temp2").innerHTML = "Temperature: " + data.daily[2].temp.day+ "F";
        document.querySelector("#humidity2").innerHTML = "Humidity: " + data.daily[2].humidity + "%";
        var iconCode = data.daily[2].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + iconCode +"@2x.png";
        document.querySelector("#icon2").setAttribute("src", iconUrl);

        document.querySelector("#date3").innerHTML = luxon.DateTime.now().plus({ days: 3}).toLocaleString(luxon.DateTime.DATE_SHORT);
        document.querySelector("#temp3").innerHTML = "Temperature: " + data.daily[3].temp.day+ "F";
        document.querySelector("#humidity3").innerHTML = "Humidity: " + data.daily[3].humidity + "%";
        var iconCode = data.daily[3].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + iconCode +"@2x.png";
        document.querySelector("#icon3").setAttribute("src", iconUrl);

        document.querySelector("#date4").innerHTML = luxon.DateTime.now().plus({ days: 4}).toLocaleString(luxon.DateTime.DATE_SHORT);
        document.querySelector("#temp4").innerHTML = "Temperature: " + data.daily[4].temp.day+ "F";
        document.querySelector("#humidity4").innerHTML = "Humidity: " + data.daily[4].humidity + "%";
        var iconCode = data.daily[4].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + iconCode +"@2x.png";
        document.querySelector("#icon4").setAttribute("src", iconUrl);

        document.querySelector("#date5").innerHTML = luxon.DateTime.now().plus({ days: 5}).toLocaleString(luxon.DateTime.DATE_SHORT);
        document.querySelector("#temp5").innerHTML = "Temperature: " + data.daily[5].temp.day+ "F";
        document.querySelector("#humidity5").innerHTML = "Humidity: " + data.daily[5].humidity + "%";
        var iconCode = data.daily[5].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + iconCode +"@2x.png";
        document.querySelector("#icon5").setAttribute("src", iconUrl);
}
var storedCitiesArray = [];

//make buttons from local storage data on page load
//localStorage.getItem...

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
        location = (location[0].toUpperCase()+ location.substring(1));

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
    //console.log("button was clicked");
    
    // prevent the event from bubbling up to next element
    event.preventDefault();

    // get value from input element and trim off any spaces
    var locationEl = document.querySelector("#location");
    var location = locationEl.value.trim();

    //show five day cards when button is clicked
    document.getElementById("five-day").style.display="flex";
    document.getElementById("current-conditions").style.display="inline";

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

//function to make buttons load on page load
var buttonHistory = () =>{
    if(localStorage.getItem("storedCities")) {
        storedCitiesArray = JSON.parse(localStorage.getItem("storedCities"));
        console.log(localStorage.getItem("storedCities"))
        //loop through makeCityButtons function
        for (i=0; i<storedCitiesArray.length; i++) {
            //console.log("storedCities");
            makeCityButtons(storedCitiesArray[i]);
        }
        //location = ; //index0  
    } else {
        console.log("empty storage");
    }
}
buttonHistory();
