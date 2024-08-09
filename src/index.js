function searchCity(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = document.querySelector("#current-city");
  city.innerHTML = searchInputElement.value;
}

let enterCityForm = document.querySelector("#search-city-form");
enterCityForm.addEventListener("submit", searchCity);
