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
  let temperatureElement = document.querySelector("#currentTemperature");
  let cityElement = document.querySelector("#currentCity");
  let description = document.querySelector("#conditions");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windSpeed");
  let dateElement = document.querySelector("#time");
  let iconElement = document.querySelector("#image");
  let iconUrl = response.data.condition.icon_url;
  cTemp = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
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
let search = document.querySelector("form");
search.addEventListener("submit", searching);

let cityReturn = document.querySelector("button");
cityReturn.addEventListener("click", returnCity);

navigator.geolocation.getCurrentPosition(logPosition);

let fLink = document.querySelector("#fTemperature");
fLink.addEventListener("click", displayF);

let cLink = document.querySelector("#cTemperature");
cLink.addEventListener("click", displayC);
