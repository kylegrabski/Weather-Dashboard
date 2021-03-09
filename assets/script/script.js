var api_key = "6a2eb678a90275c6b6a6400f5f55c19b";

var baseurl = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${api_key}`;


var lat;
var lon;
var part;
// uv index but only takes in latitude and longitude
var onecallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;

console.log(baseurl);



var city = //user input;
function getWeather(city) {
  var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  fetch(currentWeatherUrl)
    .then((data) => data.json())
    .then(function (weather) {
      console.log(weather);
      var lat = weather.coord.lat;
      var lon = weather.coord.lon;
      var onecallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;
console.log(part)
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

console.log("forecast url", forecastUrl);

getWeather("Temecula");
getWeather("Gilbert");








// function(data) {
//   let data = data.json()
//   } (edited) 
  
//   Jeremy Collins  5:49 PM
//   https://openweathermap.org/img/wn/${iconID}@2x.png
//   5:51
//   var getIcon = function (iconID) {
//      var iconUrl = `https://openweathermap.org/img/wn/${iconID}@2x.png`;
//      var iconEl = $("<img>").attr("alt", "Weather icon").attr("src", iconUrl);
//      return iconEl;
//   }; (edited) 
//   5:52
//   getIcon(weather.weather[0].id);
//   5:53
//   let iconID = weather.weather[0].id
//   5:53
//   getIcon(IconID);