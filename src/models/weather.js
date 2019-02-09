const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');
const cityCodes = require('../data/city.list.json')

const Weather = function() {
  this.data = null;
  this.actualData = null;
  this.country = null;
};

Weather.prototype.bindEvents = function() {
  PubSub.subscribe('SelectCityView:city-input', (event) => {
    const cityName = event.detail;
    console.log(cityName);
    const cityCode = cityCodes.filter((city) => city.name === cityName);
    console.log(cityCode[0].id);
    const actualCityCode = cityCode[0].id;
    this.getData(actualCityCode);
  });
};


Weather.prototype.getData = function(cityId) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=b0d3643e15362e208da4ec5867b98afa`;
  const request = new RequestHelper(url);
  request.get()
    .then((activity) => {
      this.data = activity;
      this.generateNewObject(this.data);
      console.log(this.actualData);
      PubSub.publish('Weather:city-found', this.actualData);
    });
    // .catch((err) => {
    //   // PubSub.publish('Weather:error', err);
    // });
};

Weather.prototype.generateNewObject = function(cityData) {
  this.actualData = new Object();
  this.actualData.name = cityData.city.name;
  this.getCountryName(cityData.city.country);
  // PubSub.subscribe('Weather:country-found', (event) => {
  //   this.actualData.country = event.detail;
  // });
  // this.actualData.country = this.country;
  // console.log(countryName);
  // this.actualData.country = cityData.city.country;
  this.actualData.id = cityData.city.id;
  this.actualData.dates = [];

  const dateArray = [];
  const dateTimeArray = [];
  cityData.list.forEach((date) => {
    const dayofDate = new Date(date.dt_txt).toDateString();
    const dayofDateSplit = dayofDate.split(" ");
    const splitData = date.dt_txt.split(" ");
    dateArray.push(splitData[0]);
    dateTimeArray.push(splitData);
    const dateInfo = new Object();
    dateInfo.datetime = date.dt_txt;
    dateInfo.date = splitData[0];
    dateInfo.time = splitData[1];
    dateInfo.day = dayofDateSplit[0];
    dateInfo.weather = [];

    weatherInfo = new Object();
    weatherInfo.main = date.weather[0].main;
    weatherInfo.description = date.weather[0].description;
    dateInfo.weather.push(weatherInfo);

    this.actualData.dates.push(dateInfo);

    this.generateUniqueDates(dateArray);

    // const dateItem = document.createElement('li');
    // dateItem.textContent = date.dt_txt;
    // cityContainer.appendChild(dateItem);
  });
  // const uniqueDates = new Set(dateArray);
  // uniqueArray = Array.from(uniqueDates);
  // console.log(uniqueArray);
};

Weather.prototype.getCountryName = function(countryCode) {
  const url = `https://restcountries.eu/rest/v2/alpha/${countryCode}`;
  const request = new RequestHelper(url);
  request.get()
  .then((activity) => {
    this.country = activity;
    PubSub.publish('Weather:city-name', activity);
  });
}

Weather.prototype.outputCountry = function(country){
  console.log(country.name);
  this.actualData.country = country.name;
}

Weather.prototype.generateUniqueDates = function(dateArray) {
  const uniqueDates = new Set (dateArray);
  const uniqueDateArray = Array.from(uniqueDates);
  this.actualData.uniqueDates = []

  uniqueDateArray.forEach((date) => {

    const uniqueDate = new Object();
    uniqueDate.date = date;
    const uniqueDay = this.generateDayOfWeek(date);
    uniqueDate.day = uniqueDay;
    uniqueDate.times = [];
    this.actualData.uniqueDates.push(uniqueDate);
    const array = this.generateTimesofUniqueDates(date);
    uniqueDate.times.push(array);
  });





   // = uniqueDateArray;

}

Weather.prototype.generateDayOfWeek = function(date) {
  const dateObject = new Date(date);
  const dateString = dateObject.toDateString().split(" ");
  return dateString;
};

Weather.prototype.generateTimesofUniqueDates = function(date) {
  const array = []
  this.data.list.forEach((item) => {
    if (item.dt_txt.includes(date)) {
      array.push(item);
      // console.log(item);
    };
  });
  return array;
  // this.actualData.uniqueDates.times.push(array);
  console.log(array);
};


module.exports = Weather;
