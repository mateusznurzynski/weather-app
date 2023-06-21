const resultElement = document.querySelector('.result');
const weatherFormElement = document.querySelector('.weather-form');
const searchQueryElement = document.querySelector('.search-query');

const getDays = function getDays(jsonData, skipFirst) {
  const days = [];
  jsonData.forecast.forecastday.forEach((day) => {
    days.push(day);
  });

  if (skipFirst) {
    days.shift();
  }

  return days;
};

const getWeatherData = async function getCurrentWeatherData(query) {
  const rawData = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=b5cafa5667d44f76b7b162143232106&days=7&q=${query}`
  );
  const weatherData = await rawData.json();

  return weatherData;
};

const processForecastData = function processForecastData(jsonData) {
  const dataObject = {
    current: jsonData.current,
    days: getDays(jsonData, true),
    country: jsonData.location.country,
    location: jsonData.location.name,
    time: jsonData.location.localtime,
  };

  return dataObject;
};

const startLoadingAnimation = function startLoadingAnimation() {
  resultElement.innerHTML = 'Loading data...';
};

const getWeather = async function getWeather(searchQuery) {
  const rawWeatherData = await getWeatherData(searchQuery);
  const weatherData = processForecastData(rawWeatherData);

  return weatherData;
};

const renderWeather = async function renderWeather(searchQuery) {
  const weatherData = await getWeather(searchQuery);
  console.log(weatherData);

  resultElement.innerHTML = `<h2>Weather for: ${weatherData.location}, ${weatherData.country}, ${weatherData.time}</h2>
  <div class="weather-cards">
  	<div class="card main-card">
  	  <div class="card-title">${weatherData.current.condition.text}</div>
  	  <div class="card-content"><img class="main-img" src='https:${weatherData.current.condition.icon}'></div>
	</div>
	<div class="cards-wrapper">
	<div class="card">
	  <div class="card-title">Temperature:</div>
	  <div class="card-content">${weatherData.current.temp_c} °C</div>
	</div>
	<div class="card">
	  <div class="card-title">Feels like:</div>
	  <div class="card-content">${weatherData.current.feelslike_c} °C</div>
	</div>
	<div class="card">
	  <div class="card-title">Wind speed:</div>
	  <div class="card-content">${weatherData.current.wind_kph} km/h</div>
	</div>
	<div class="card">
	  <div class="card-title">Humidity:</div>
	  <div class="card-content">${weatherData.current.humidity}%</div>
	</div>
	</div>
  </div>`;
};

weatherFormElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchQuery = searchQueryElement.value;
  if (!searchQuery) {
    return false;
  }
  startLoadingAnimation();
  renderWeather(searchQuery);
  weatherFormElement.reset();
});
