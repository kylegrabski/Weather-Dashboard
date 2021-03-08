var api_key = "6a2eb678a90275c6b6a6400f5f55c19b";

var baseurl = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid${api_key}`;

// uv index but only takes in latitude and longitude
var onecallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=${api_key}`;

console.log(baseurl);

var city = "Temecula";
function getWeather(city) {
  var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q={${city}}&appid=${api_key}`;

  fetch(currentWeatherUrl)
    .then((data) => data.json())
    .then(function (weather) {
      console.log(weather);
      var lat = weather.coord.lat;
      var lon = weather.coord.lon;
      var onecallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${api_key}`;

      // look up recorded office hours on mar 8th!!!
      fetch(onecallUrl)
        .then((data) => data.json())
        .then(function (oneCallData) {
            console.log(oneCallData);
        });
    });
}

var forecastUrl =
  "http://api.openweathermap.org/data/2.5/forecast?q=Phoenix&appid=a3db2f5a7756948aa37463f113a69ca0";

console.log(forecastUrl);

getWeather("Temecula");
getWeather("Gilbert");





// create search bar with button
// when button clicked, use search criteria to get weather from API

// main container appears in center of screen
// displays city name and todays date along with icon showing weather, data on temp, humidity, windspeed, and UV index

// 5 card appear below main content showing 5 day forecast.

// search is saved and shown in container below search bar

// can be triggered on form submit(user search) as well as button click
// build function that retrieves weather that takes in the (city)

// the history should be locally stored in as a JSON array
