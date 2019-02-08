const Weather = require('./models/weather');
const SelectCityView = require('./views/select_city_view.js');
const CityWeatherView = require('./views/city_weather_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const weather = new Weather();
  weather.bindEvents();

  const selectCityForm = document.querySelector('#select-city-form');
  const selectCityView = new SelectCityView(selectCityForm);
  selectCityView.bindEvents();

  const cityWeatherContainer = document.querySelector('#weather-container');
  const cityWeatherView = new CityWeatherView(cityWeatherContainer);
  cityWeatherView.bindEvents();
});
