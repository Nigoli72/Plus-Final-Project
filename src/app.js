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
  console.log(response);
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
  let iconElement = document.querySelector("#image");
  let iconUrl = response.data.condition.icon_url;
  iconElement.setAttribute("src", iconUrl);
}
function searching(event) {
  event.preventDefault();
  let city = document.querySelector(".city");
  searchCity(city.value);
}
function searchCity(city) {
  let apiKey = "74ft7426o38737ab0c3021aae5a380df";
  let newUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(newUrl).then(displayWeather);
}
let search = document.querySelector("form");
search.addEventListener("submit", searching);

navigator.geolocation.getCurrentPosition(logPosition);
