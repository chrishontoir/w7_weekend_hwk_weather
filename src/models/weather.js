const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');
const cityCodes = require('../data/city.list.json')

const Weather = function() {
  this.data = null;
  this.actualData = null;
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
      PubSub.publish('Weather:city-found', this.actualData);
    });
    // .catch((err) => {
    //   // PubSub.publish('Weather:error', err);
    // });
};

Weather.prototype.generateNewObject = function(cityData) {
  this.actualData = new Object();
  this.actualData.name = cityData.city.name;
  this.actualData.country = cityData.city.country;
  this.actualData.id = cityData.city.id;
  this.actualData.dates = [];

  const dateArray = [];
  const dateTimeArray = [];
  cityData.list.forEach((date) => {
    const splitData = date.dt_txt.split(" ");
    dateArray.push(splitData[0]);
    dateTimeArray.push(splitData);
    const dateInfo = new Object();
    dateInfo.datetime = date.dt_txt;
    dateInfo.date = splitData[0];
    dateInfo.time = splitData[1];
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

Weather.prototype.generateUniqueDates = function(dateArray) {
  const uniqueDates = new Set (dateArray);
  const uniqueDateArray = Array.from(uniqueDates);
  this.actualData.uniqueDates = []

  uniqueDateArray.forEach((date) => {
    const uniqueDate = new Object();
    uniqueDate.date = date;
    uniqueDate.times = [];
    this.actualData.uniqueDates.push(uniqueDate);
    const array = this.generateTimesofUniqueDates(date);
    uniqueDate.times.push(array);
  });



   // = uniqueDateArray;

}

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
