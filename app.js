const api = {
  key: "c405b7757602550ec70ff322cd5812dc",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".form-control");
const body = document.querySelector("body");
const forecast = document.querySelector(".forecast");
const footer = document.querySelector("footer");
let now = new Date();

searchBox.addEventListener("keypress", setQuery);

function setQuery(event) {
  if (event.keyCode == 13) {
    getData(searchBox.value);
    searchBox.value = "";
  }
}

function getData(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((location) => location.json())
    .then(getResult);
}

function getResult(location) {
  let lon = location.coord.lon;
  let lat = location.coord.lat;
  let city = document.querySelector(".location .city");
  city.innerHTML = `${location.name}, ${location.sys.country}`;
  fetch(
    `${api.baseurl}onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&APPID=${api.key}`
  )
    .then((location) => location.json())
    .then(displayCurrentWeather);
}

function displayCurrentWeather(location) {
  console.log(location);

  if (location.current.weather[0].main == "Rain") {
    body.classList.add("weather_rain");
  } else {
    body.classList.remove("weather_rain");
  }

  if (location.current.weather[0].main == "Clouds") {
    body.classList.add("weather_clouds");
  } else {
    body.classList.remove("weather_clouds");
  }

  if (location.current.weather[0].main == "Clear") {
    body.classList.add("weather_clear");
  } else {
    body.classList.remove("weather_clear");
  }

  if (location.current.weather[0].main == "Thunderstorm") {
    body.classList.add("weather_thunderstorm");
  } else {
    body.classList.remove("weather_thunderstorm");
  }

  let dateTime = document.querySelector(".date-time");
  dateTime.innerText = dateBuilder(now);

  let bigTemp = document.querySelector(".big-temp");
  bigTemp.innerHTML = `${Math.round(location.current.temp)}<span>°C</span>`;

  let weatherDesc = document.querySelector(".weather");
  weatherDesc.innerText = `${location.current.weather[0].main}`;

  let feelsLike = document.querySelector(".feels-like-temp");
  feelsLike.innerHTML = `Feels like <span class="feels-degrees">${Math.round(
    location.current.feels_like
  )}°C</span>`;
  footer.innerHTML = `BKirilov Weather <span>&copy;</span> 2020`;
  displayForecast(location.daily);
}

function displayForecast(location) {
  location.splice(5, 3);
  forecast.innerHTML = "";
  for (let i = 0; i < location.length; i++) {
    createForecast(location[i], i + 1);
  }
}

function createForecast(day, to_add) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let n = now.getDay() + to_add;
  let name = n <= 6 ? days[n] : days[n - 7];
  const item = document.createElement("div");
  item.classList.add("day");
  item.innerHTML = `<div class="name">${name}</div>
  <div class="temp">${Math.round(day.temp.min)}° / ${Math.round(
    day.temp.max
  )}°</div>
  <div class="weather-forecast">${day.weather[0].main}</div>`;
  forecast.appendChild(item);
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
