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
  getForecast(response.data.city);
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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "t3f3af9b184481d0306edc82cbo6ff8c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);
  let forecastHtml = "";

  response.data.daily.forEach(function (dayOfWeek, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="forecast-day">
      <div class="day-of-week">${formatDay(dayOfWeek.time)}</div>
      <div >
      <img src="${dayOfWeek.condition.icon_url}" class="day-emoji"/>
      </div>
      <div class="temperature-wrapping">
        <div class="day-high-temperature">
          <strong>${Math.round(dayOfWeek.temperature.maximum)}º</strong>
        </div>
        <div class="day-low-temperature">
          ${Math.round(dayOfWeek.temperature.minimum)}º
        </div>
      </div>
    </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let enterCityForm = document.querySelector("#search-city-form");
enterCityForm.addEventListener("submit", search);

searchCity("Kelowna");
