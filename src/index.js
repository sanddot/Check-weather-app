function updateWeather(response) {
  let currentTemperature = document.querySelector("#temperature");
  let responseTemperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let precipitationElement = document.querySelector("#current-precipitation");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");
  let emojiElement = document.querySelector("#emoji");
  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  //not picking up time for input value location. Showing current time at my location. ???

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  precipitationElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;
  emojiElement.innerHTML = `<img src="${response.data.condition.icon_url}"class="emoji"/>`;
  currentTemperature.innerHTML = responseTemperature;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
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
