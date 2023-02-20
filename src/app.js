function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = 0`${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = 0`${minutes}`;
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

function displayWeather(response) {
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#currentCity");
  cityElement.innerHTML = response.data.city;
  let description = document.querySelector("#conditions");
  description.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  let windElement = document.querySelector("#windSpeed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#time");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
}

let apiKey = "74ft7426o38737ab0c3021aae5a380df";
let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=38.71667&lon=-9.13333&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);
