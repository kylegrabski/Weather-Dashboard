// -------------------API's--------------------------------------

var api_key = "6a2eb678a90275c6b6a6400f5f55c19b";

// is baseurl needed????? Probably not
var baseurl = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${api_key}`;

// uv index but only takes in latitude and longitude
var onecallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`

var forecastUrl =
  "http://api.openweathermap.org/data/2.5/forecast?q=Phoenix&appid=a3db2f5a7756948aa37463f113a69ca0";

// --------------------HTML ELEMENTS-----------------------------
var $btn = document.querySelector(".btn");
var $form = document.querySelector(".form-input");
var $searchCardsContainer = document.querySelector("#search-cards-container");
var $currentWeatherContainer = document.querySelector(
  "#current-weather-container"
);

// --------------------------------------------------------------
var userSearch = [];
var lat;
var lon;

// on page reload, clear local storage
localStorage.clear();

// var so we can put it in the event listener parameter at the bottom
var formSubmitHandler = function (event) {
  event.preventDefault();

  // getWeather($form.value);
  var search = $form.value;
  userSearch.push(search);
  localStorage.setItem("Search History", userSearch);

  $form.value = "";
  getWeather(search);

  return userSearch;
};

// --------------------------FUNCTIONS-----------------------------

function getWeather(city) {
  var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  fetch(currentWeatherUrl)
    .then((data) => data.json())
    .then(function (weather) {
      if (weather.cod === "404") {
        alert("No city with that name");
        return;
      }

      createSearchCard(weather.name);
      createCurrentWeather(weather);

      var lat = weather.coord.lat;
      var lon = weather.coord.lon;

      var onecallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;
      fetch(onecallUrl)
        .then((data) => data.json())
        .then(function (oneCallData) {});
    });
}

function createSearchCard(cityName) {
  $searchCardsContainer.innerHTML = "";
  $("<div>").addClass("cards").text(cityName).appendTo($searchCardsContainer);

}


// ------------------CREATE CURRENT WEATHER CONTAINER------------------
function createCurrentWeather(weather) {
  // clear container
  // clearCurrentWeather();
 $currentWeatherContainer.innerHTML = "";

  // City Name
  var cityName = weather.name;
  $("<div>")
    .addClass("current-weather")
    .text(cityName)
    .appendTo($currentWeatherContainer);
  var $currentWeather = document.querySelector(".current-weather");

  // Current Date USE MOMENT.JS!!!!
  // var currentDate;

  // Icon representing Weather Conditions
  var icon = weather.weather[0].icon;
  var iconSource = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  var $img = document.createElement("img");
  $img.setAttribute("src", iconSource);

  //   Temperature
  // Convert KELVIN ----> Farenheit
  var tempKelvin = weather.main.temp;
  var tempF = Math.floor(1.8 * (tempKelvin - 273) + 32) + " Degrees ";

  //   // Humidity
  var humidity = " Humidity: " + weather.main.humidity;

  //   // Wind speed
  var windspeed = " Windspeed: " + Math.floor(weather.wind.speed) + " MPH ";

  // var uvIndex;
  // oneCallData.current.uvi
  var lat = weather.coord.lat;
  var lon = weather.coord.lon;

  var onecallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;
  fetch(onecallUrl)
    .then((data) => data.json())
    .then(function (oneCallData) {
      var $uvIndex = " UV Index: " + oneCallData.current.uvi;

      return $currentWeather.append($img, tempF, humidity, windspeed, $uvIndex);
    });
    
};


$btn.addEventListener("click", formSubmitHandler);

// Async Await
// works with promises(.then is a promise)
// type in async before the function.
