function displayTemperature (response){
  console.log (response.data);
  let temperatureElement=document.querySelector("#temperature");
  temperatureElement.innerHTML=Math.round(response.data.main.temp);
  let cityElement=document.querySelector("#city");
  cityElement.innerHTML=response.data.name;
  let descriptionElement=document.querySelector("#weather-description");
  descriptionElement.innerHTML=response.data.weather[0].description;
  let humidityElement=document.querySelector("#humidity");
  humidityElement.innerHTML=response.data.main.humidity;
  let windElement=document.querySelector("#wind");
  windElement.innerHTML=Math.round(response.data.wind.speed);
   let feelsLikeElement=document.querySelector("#feels-like");
  feelsLikeElement.innerHTML=Math.round(response.data.main.feels_like);
}


  let apiKey = "0bca7a6e963a4888aee2f2257270c526";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

