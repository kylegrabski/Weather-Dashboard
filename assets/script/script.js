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
var $forecastCardContainer = document.querySelector("#forecast-card-container");

// --------------------------------------------------------------
var userSearch = [];
var lat;
var lon;

// on page reload, clear local storage
localStorage.clear();

// var so we can put it in the event listener parameter at the bottom

// --------------------------FUNCTIONS-----------------------------

// -----------------SAVING SEARCH HISTORY-------------
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

// ---------------GET WEATHER DATA---------------------------------
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

// ----------------CREATE SEARCH HISTORY CARD-----------------
function createSearchCard(cityName) {
  // $searchCardsContainer.innerHTML = "";
  $("<div>").addClass("cards").text(cityName).appendTo($searchCardsContainer);
}

// ------------------CREATE CURRENT WEATHER CONTAINER-----------
function createCurrentWeather(weather) {
  // clear container
  // clearCurrentWeather();
  $currentWeatherContainer.innerHTML = "";

  // Weather Data
  var weatherData = weather;
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
      var uvBackground;

      if (oneCallData.current.uvi <= 2) {
        uvBackground = ".favorable";
      } else if (oneCallData.current.uvi >= 3 && oneCallData.current.uvi <= 5) {
        uvBackground = ".moderate";
      } else {
        uvBackground = ".severe";
      }
      var $uvIndex = " UV Index: " + oneCallData.current.uvi;

      // NEED TO HAVE uvINDEX BE ITS OWN ELEMENT
      // $uvIndex.classList.add(uvBackground);
      console.log(uvBackground);

      $currentWeather.append($img, tempF, humidity, windspeed, $uvIndex);
      createForecast(weatherData);
    });
}

// -------------------CREATE 5 DAY FORECAST -------------------
function createForecast(cityName) {
  var city = cityName.name;

  var lon = cityName.coord.lon;
  var lat = cityName.coord.lat;
  var onecallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;
  fetch(onecallUrl)
    .then((data) => data.json())
    .then(function (onecallUrlData) {
      // get 5 day forecast showing

      console.log(onecallUrlData);

      // Date Variables
      var tempArr = [];
      var displayDateArr = [];
      var humidityArr = [];
      var iconArr = [];

      for (let i = 0; i <= 4; i++) {
        // Get Date Data
        var newDisplay = Date(onecallUrlData.daily[i].dt);
        displayDateArr.push(newDisplay);

        // Get Temp Data
        // Convert Kelvin to Farenheit
        tempArr.push(
          Math.floor(1.8 * (onecallUrlData.daily[i].temp.day - 273) + 32)
        );

        // Humidity Data
        humidityArr.push(onecallUrlData.daily[i].humidity);

        // Icon Data
        // iconArr.push(onecallUrlData.daily[i].weather[i].icon);
        // var iconSource = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        // var $img = document.createElement("img");
        // $img.setAttribute("src", iconSource);
      }
      console.log("Temperature" + tempArr);
      console.log("Date" + displayDateArr);
      console.log("Humidity" + humidityArr);

      
      
      
      // ***********Create Forecast Cards*************
      for (let j = 0; j <= 4; j++) {

        $forecastCardContainer.append(document.createElement("div").classList.add(`forecast-card${j}`));   
        // var forecast1 = document.querySelector(".forecast-card1`");
        

      };
      // Date.prototype.toDateString(displayDate)

      // var displayDate = date.toLocaleString('en-US',{month: 'numeric', day:'2-digit', year:'numeric'});

      // icon
    });
}

$btn.addEventListener("click", formSubmitHandler);

// Async Await
// works with promises(.then is a promise)
// type in async before the function.
