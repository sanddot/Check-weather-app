function updateWeather(response) {
  let currentTemperature = document.querySelector("#temperature");
  let responseTemperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  currentTemperature.innerHTML = responseTemperature;
}

function searchCity(city) {
  let apiKey = "t3f3af9b184481d0306edc82cbo6ff8c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  searchCity(searchInputElement.value);
}
let enterCityForm = document.querySelector("#search-city-form");
enterCityForm.addEventListener("submit", search);

searchCity("Kelowna");
