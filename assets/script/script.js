var api_key = "6a2eb678a90275c6b6a6400f5f55c19b";

var baseurl = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${api_key}`;

var $btn = document.querySelector(".btn");
var $form = document.querySelector(".form-input");
var $searchCardsContainer = document.getElementById("search-cards-container");

var userSearch = [];

var lat;
var lon;

// uv index but only takes in latitude and longitude
var onecallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;

// on page reload, clear local storage
localStorage.clear();

var formSubmitHandler = function (event) {
  event.preventDefault();
  
  // getWeather($form.value);
  var search = $form.value
  userSearch.push(search);
  localStorage.setItem("Search History",(userSearch)); 
  
  $form.value = "" 
  getWeather(search)
  
 
 
  return userSearch
};


// var city = //user input;
function getWeather (city) {
  var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  fetch(currentWeatherUrl)
    .then((data) => data.json())
    .then(function (weather) {

     
      var weatherName = weather.name;
      console.log(weatherName)
      if (weather.cod === "404"){
        alert ("put in city name")
          return;
      }
      createSearchCard(weatherName);
      //  else run function to create search cards and main weather card
      var lat = weather.coord.lat;
      var lon = weather.coord.lon;
      
      var onecallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;
      fetch(onecallUrl)
        .then((data) => data.json())
        .then(function (oneCallData) {
            
        });
        console.log(weatherName)
        
        
    });
};


function createSearchCard (cityName){
  var city = cityName;
  console.log(typeof city)
  $("<p>").text(city).appendTo($searchCardsContainer);
  // $searchCardsContainer.append($card);
}
// stringified set array only allows unique items

// Async Await 
// works with promises(.then is a promise)
// type in async before the function. 

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