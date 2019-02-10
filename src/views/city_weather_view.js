const PubSub = require('../helpers/pub_sub.js');
const CityDayView = require('./city_day_view.js');

const CityWeatherView = function(container) {
  this.container = container;
  this.element = null;
  this.data = null;
  this.name = null;
};

CityWeatherView.prototype.bindEvents = function() {
  PubSub.subscribe('Weather:city-found', (event) => {
    const cityData = event.detail;
    this.data = cityData;
    console.log(cityData);
  });

  PubSub.subscribe('Weather:city-name', (event2) => {
    const cityName = event2.detail;
    this.name = cityName;
    this.render(this.data);
  });
};

CityWeatherView.prototype.render = function(cityData) {
  console.log(cityData.name);
  console.log(this.name.name);
  this.container.innerHTML = "";
  const weatherContainer = document.querySelector('#weather-times');
  weatherContainer.innerHTML = "";
  const cityContainer = document.createElement('div');
  this.container.appendChild(cityContainer);

  const cityCountryContainer = document.createElement('div');
  cityContainer.appendChild(cityCountryContainer);

  const cityName = document.createElement('h1');
  cityName.textContent = cityData.name;
  cityCountryContainer.appendChild(cityName);

  const cityCountry = document.createElement('h2');
  cityCountry.textContent = this.name.name;
  cityCountryContainer.appendChild(cityCountry);

  const cityFlag = document.createElement('img');
  cityFlag.src = this.name.flag;
  cityCountryContainer.appendChild(cityFlag);

  this.element = document.createElement('ul');
  cityContainer.appendChild(this.element);

  cityData.uniqueDates.forEach((date) => {
    const cityDates = document.createElement('button');
    cityDates.innerHTML = `${date.day[0]}<br><span>${date.day[2]}</span><br>${date.day[1]}`;
    cityDates.value = date.date
    this.element.appendChild(cityDates);
  });

  this.element.addEventListener('click', (event) => {
    console.log(this.element.childNodes[0]);
    this.element.childNodes.forEach((node) => {
      node.classList.remove('selected');
    });
    const selectedDate = event.target.value;
    event.target.classList.add('selected');
    console.log(selectedDate);
    const cityDayView = new CityDayView(this.container, this.data, selectedDate);
    cityDayView.getData();
    console.log(cityDayView);
  });
};

module.exports = CityWeatherView;
