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

  console.log(weatherData);

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

getWeatherData('Lukow');
