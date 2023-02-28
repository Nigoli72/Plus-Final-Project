function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0"`${hours}`;
  }
  let minutes = date.getMinutes();
  if (hours < 10) {
    minutes = "0"`${minutes}`;
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

  return `${day} ${hours}:${minutes}`;
}

function logPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "74ft7426o38737ab0c3021aae5a380df";

  let url = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}
function displayWeather(response) {
  console.log(response.data);
  cTemp = response.data.temperature.current;
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = Math.round(cTemp);
  let cityElement = document.querySelector("#currentCity");
  cityElement.innerHTML = response.data.city;
  let description = document.querySelector("#conditions");
  description.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  let windElement = document.querySelector("#windSpeed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

function displayWeatherForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
    <div class="weather-forecast-daily">${day}</div>
      <img src= "https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}" 
      alt="${icon}" 
      width="40" />;
      <div class="forecast-temps">
        <span class="daily-high">${dailyHigh} °</span>
        <span class="daily-low">${dailyLow} °</span>
      </div>
    </div>`;
  });
  forecastHTML = forcastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let lat = response.data.coordinates.latitude;
  let lon = response.data.coordinates.longitude;
  let apiKey = "74ft7426o38737ab0c3021aae5a380df";
  let forecastUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric`;
  axios.get(forecastUrl).then(displayWeatherForecast);
}
function searching(event) {
  event.preventDefault();
  let city = document.querySelector(".city").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "74ft7426o38737ab0c3021aae5a380df";
  let newUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(newUrl).then(displayWeather);
}

function returnCity(event) {
  navigator.geolocation.getCurrentPosition(logPosition);
}
function displayF(event) {
  event.preventDefault();
  cLink.classList.remove("active");
  fLink.classList.add("active");

  let fTemp = (cTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = Math.round(fTemp);
}
function displayC(event) {
  event.preventDefault();
  fLink.classList.remove("active");
  cLink.classList.add("active");
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = Math.round(cTemp);
}
let cTemp = null;

let searchElement = document.querySelector("form");
searchElement.addEventListener("submit", searching);

let cityReturn = document.querySelector("button");
cityReturn.addEventListener("click", returnCity);

navigator.geolocation.getCurrentPosition(logPosition);

let fLink = document.querySelector("#fTemperature");
fLink.addEventListener("click", displayF);

let cLink = document.querySelector("#cTemperature");
cLink.addEventListener("click", displayC);
