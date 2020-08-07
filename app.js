const api = {
  key: "c405b7757602550ec70ff322cd5812dc",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".form-control");
const body = document.querySelector("body");

searchBox.addEventListener("keypress", setQuery);

function getResult(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((data) => data.json())
    .then(displayResult);
}

function displayResult(location) {
  console.log(location);
  let city = document.querySelector(".city");
  city.innerText = `${location.name}, ${location.sys.country}`;

  let now = new Date();
  let dateTime = document.querySelector(".date-time");
  dateTime.innerText = dateBuilder(now);

  let bigTemp = document.querySelector(".big-temp");
  bigTemp.innerHTML = `${Math.round(location.main.temp)}<span>°C</span>`;

  let weatherDesc = document.querySelector(".weather");
  weatherDesc.innerText = `${location.weather[0].main}`;

  let feelsLike = document.querySelector(".feels-like-temp");
  feelsLike.innerHTML = `Feels like ${Math.round(
    location.main.feels_like
  )}<span>°C</span>`;
}

function setQuery(event) {
  if (event.keyCode == 13) {
    getResult(searchBox.value);
  }
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
