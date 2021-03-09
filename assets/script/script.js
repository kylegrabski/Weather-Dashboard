var api_key = "6a2eb678a90275c6b6a6400f5f55c19b";

var baseurl = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${api_key}`;

var $btn = document.querySelector(".btn");
var $form = document.querySelector(".form-input");

// var userSearch = [];

var lat;
var lon;

// uv index but only takes in latitude and longitude
var onecallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;


var formSubmitHandler = function (event) {
  event.preventDefault();
  var citySearch = $form.value

  if (citySearch) {
    getWeather(citySearch)
  }else
  alert("Please Enter a City Name")
console.log(citySearch)
};






// var city = //user input;
var getWeather = function (city) {
  var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  fetch(currentWeatherUrl)
    .then((data) => data.json())
    .then(function (weather) {
      console.log(weather);
      
      var lat = weather.coord.lat;
      var lon = weather.coord.lon;
      
      var onecallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;
      fetch(onecallUrl)
        .then((data) => data.json())
        .then(function (oneCallData) {
            // console.log(oneCallData);
        });
    });
}

var forecastUrl =
  "http://api.openweathermap.org/data/2.5/forecast?q=Phoenix&appid=a3db2f5a7756948aa37463f113a69ca0";




  $btn.addEventListener('click', formSubmitHandler);
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