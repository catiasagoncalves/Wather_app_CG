function actualtDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} at ${hours}:${minutes}`;
}

function displayForecast(response){
  console.log(response.data.daily);
  let forecastElement=document.querySelector("#forecast");
  let forecastHTML=`<div class="row">`;

  let days= ["Thu" , "Fri", "Sat", "Sun"];
  days.forEach(function(day) {
forecastHTML=forecastHTML + `
  <div class="col-2">
    <div class="forecast-week-day">
         ${day}  
    </div>
     <img src="#" alt="">
     <div class="forecast-temperature">
    <span class="forecast-max-temp">
        18ºC
    </span>
    <span class="forecast-min-temp">12ºC</span> 
         </div>
  </div>`;

  }  );
  
  forecastHTML = forecastHTML + `<div>`;
forecastElement.innerHTML=forecastHTML;
}


function getForecast(coordinates){
  console.log(coordinates);
  let apiKey="0bca7a6e963a4888aee2f2257270c526";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);

}

function displayTemperature (response){
   let temperatureElement=document.querySelector("#temperature");
  let cityElement=document.querySelector("#city");
  let descriptionElement=document.querySelector("#weather-description");
  let humidityElement=document.querySelector("#humidity");
  let windElement=document.querySelector("#wind");
  let feelsLikeElement=document.querySelector("#feels-like");
   let dateElement=document.querySelector("#date");
   let iconElement=document.querySelector("#icon");

  celsiusTemperature=response.data.main.temp;

  temperatureElement.innerHTML=Math.round(celsiusTemperature);
  cityElement.innerHTML=response.data.name;
  descriptionElement.innerHTML=response.data.weather[0].description;
  humidityElement.innerHTML=response.data.main.humidity;
  windElement.innerHTML=Math.round(response.data.wind.speed);
  feelsLikeElement.innerHTML=Math.round(response.data.main.feels_like);
  dateElement.innerHTML=actualtDate(response.data.dt*1000);
  
iconElement.setAttribute(    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast (response.data.coord);
}




 function searchCity (city){
let apiKey = "0bca7a6e963a4888aee2f2257270c526";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
 }

function locationSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-location");
  searchCity(cityInputElement.value);
}
function showFahrenheitTemperature (event){
  event.preventDefault();
  let fahrenheitTemperature= (celsiusTemperature*9)/5+32;
  let temperatureElement=document.querySelector("#temperature");
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

}

function showCelsiusTemperature (event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#temperature");
  temperatureElement.innerHTML=Math.round(  celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}



let form = document.querySelector("#location-form");
form.addEventListener("submit", locationSubmit);

let celsiusTemperature= null;

let fahrenheitLink=document.querySelector("#fahrenheit-temp");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsius-temp");
celsiusLink.addEventListener("click", showCelsiusTemperature);

searchCity("Luxembourg");

