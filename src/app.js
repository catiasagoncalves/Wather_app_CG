let now=new Date();
let hours=now.getHours();
let minutes=now.getMinutes();
let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day=days[now.getDay()];
let h1=document.querySelector ("li");
h1.innerHTML=`${day}, ${hours}:${minutes}`;

function showLocation(event) {
  event.preventDefault();
  let apiKey = "0bca7a6e963a4888aee2f2257270c526";
let city = document.querySelector("#location-input").value;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}