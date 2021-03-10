// -------------------API's--------------------------------------

var api_key = "6a2eb678a90275c6b6a6400f5f55c19b";

// is baseurl needed????? Probably not
var baseurl = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${api_key}`;

// uv index but only takes in latitude and longitude
var onecallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;

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
      console.log(weather)
      var lat = weather.coord.lat;
      var lon = weather.coord.lon;
      
      var onecallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;
      fetch(onecallUrl)
        .then((data) => data.json())
        .then(function (oneCallData) {
          
        });
    });
};

function createSearchCard(cityName) {
  $("<div>").addClass("cards").text(cityName).appendTo($searchCardsContainer);
  // $searchCardsContainer.append($card);
};


function createCurrentWeather(weather){
  // City Name
var cityName = weather.name;
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
  var tempF = Math.floor(1.8 * ((tempKelvin) - 273) + 32) + " Degrees ";

  //   // Humidity
  var humidity = "Humidity: " + weather.main.humidity;
//   // Wind speed
// var windspeed;
//   // UV index (NEED ONE CALL API) HAVE ONE CALL IN THIS FUNCTION
// var uvIndex;
  $("<div>").addClass("current-weather").text(cityName).appendTo($currentWeatherContainer);
  var $currentWeather = document.querySelector(".current-weather");

  

  $currentWeather.append($img, tempF, humidity);
};

// Async Await
// works with promises(.then is a promise)
// type in async before the function.

var forecastUrl =
  "http://api.openweathermap.org/data/2.5/forecast?q=Phoenix&appid=a3db2f5a7756948aa37463f113a69ca0";

$btn.addEventListener("click", formSubmitHandler);



// console.log("forecast url", forecastUrl);

// getWeather("Temecula");
// getWeather("Gilbert");

// function(data) {
//   let data = data.json()
//   } (edited)

//   https://openweathermap.org/img/wn/${iconID}@2x.png

//   var getIcon = function (iconID) {
//      var iconUrl = `https://openweathermap.org/img/wn/${iconID}@2x.png`;
//      var iconEl = $("<img>").attr("alt", "Weather icon").attr("src", iconUrl);
//      return iconEl;
//   }; (edited)

//   getIcon(weather.weather[0].id);

//   let iconID = weather.weather[0].id

//   getIcon(IconID);

// old code
// search btn click
// $btn.addEventListener("click", function(e){
//   e.preventDefault();

//   getWeather($form.value);
//   var search = $form.value
//   userSearch.push(search);
//   localStorage.setItem("Search", JSON.stringify(userSearch));

//   $form.value = ""

//   return userSearch;
// });
// console.log(userSearch)

// userSearch = localStorage.getItem("Search");
// JSON.parse(userSearch);
// console.log(userSearch)
// console.log(userSearch.length)

// function renderSearch (data){
// console.log(test)
// }
