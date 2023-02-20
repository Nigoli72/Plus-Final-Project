let apiKey = "74ft7426o38737ab0c3021aae5a380df";
let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=38.71667&lon=-9.13333&key=${apiKey}&units=metric`;
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
}

axios.get(apiUrl).then(displayWeather);
