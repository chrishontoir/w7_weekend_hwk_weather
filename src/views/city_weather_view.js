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

    // this.data = new Object();
    // this.data.name = cityData.city.name;
    // this.data.country = cityData.city.country;
    // this.data.id = cityData.city.id;
    // this.data.dates = [];
    //
    // console.log(this.data);

    console.log(cityData);
    // this.generateData(cityData);
    // this.render(cityData);
  });
  PubSub.subscribe('Weather:city-name', (event2) => {
    const cityName = event2.detail;
    this.name = cityName;
    this.render(this.data);
  });

};

CityWeatherView.prototype.generateData = function(cityData) {
//   const dateArray = [];
//   const dateTimeArray = [];
//   cityData.list.forEach((date) => {
//     const splitData = date.dt_txt.split(" ");
//     dateArray.push(splitData[0]);
//     dateTimeArray.push(splitData);
//     const dateInfo = new Object();
//     dateInfo.datetime = date.dt_txt;
//     dateInfo.date = splitData[0];
//     dateInfo.time = splitData[1];
//     dateInfo.weather = [];
//
//     weatherInfo = new Object();
//     weatherInfo.main = date.weather[0].main;
//     weatherInfo.description = date.weather[0].description;
//     dateInfo.weather.push(weatherInfo);
//
//     this.data.dates.push(dateInfo);
//     // const dateItem = document.createElement('li');
//     // dateItem.textContent = date.dt_txt;
//     // cityContainer.appendChild(dateItem);
//   });
//   const uniqueDates = new Set(dateArray);
//   uniqueArray = Array.from(uniqueDates);
//   console.log(uniqueArray);
};

CityWeatherView.prototype.render = function(cityData) {
  console.log(cityData.name);
  console.log(this.name.name);
  this.container.innerHTML = "";
  const weatherContainer = document.querySelector('#weather-times');
  weatherContainer.innerHTML = "";
  const cityContainer = document.createElement('div');
  this.container.appendChild(cityContainer);

  const cityName = document.createElement('h1');
  cityName.textContent = cityData.name;
  cityContainer.appendChild(cityName);

  const cityCountry = document.createElement('h2');
  cityCountry.textContent = this.name.name;
  cityContainer.appendChild(cityCountry);

  this.element = document.createElement('ul');
  cityContainer.appendChild(this.element);

  cityData.uniqueDates.forEach((date) => {
    const cityDates = document.createElement('button');
    cityDates.textContent = `${date.day[0]} ${date.day[2]} ${date.day[1]}`;
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

  // const dateArray = [];
  // const dateTimeArray = [];
  // cityData.list.forEach((date) => {
  //   const splitData = date.dt_txt.split(" ");
  //   dateArray.push(splitData[0]);
  //   dateTimeArray.push(splitData);
  //   // const dateItem = document.createElement('li');
  //   // dateItem.textContent = date.dt_txt;
  //   // cityContainer.appendChild(dateItem);
  // });
  // const uniqueDates = new Set(dateArray);
  // uniqueArray = Array.from(uniqueDates);
  // console.log(uniqueArray);
  //
  // const dateList = uniqueArray.forEach((date) => {
  //   const dateItem = document.createElement('div');
  //   const dayofDate = new Date(date).toDateString();
  //   const dayOfDateArray = dayofDate.split(" ");
  //
  //   const dayDay = document.createElement('h3');
  //   dayDay.textContent = dayOfDateArray[0];
  //   dateItem.appendChild(dayDay);
  //
  //   const dayDate = document.createElement('p');
  //   dayDate.textContent = `${dayOfDateArray[2]} ${dayOfDateArray[1]} ${dayOfDateArray[3]}`
  //   dateItem.appendChild(dayDate);
  //   // const times = this.addTimes(dateTimeArray, date);
  //   // times.forEach((time) => {
  //   //   const dayTime = document.createElement('div');
  //   //   dayTime.textContent = time[1];
  //   //   dateItem.appendChild(dayTime);
  //   //
  //   //   // const timeWeather = cityData.list.filter((dateTime) => {
  //   //   //   dateTime.dt_txt == time[0] + " " + time[1];
  //   //   //   console.log(dateTime.dt_txt);
  //   //   // });
  //   //
  //   //   cityData.list.forEach((dateTime) => {
  //   //     if (dateTime.dt_txt === time[0] + " " + time[1]) {
  //   //       const dayTimeWeather = document.createElement('div');
  //   //
  //   //       dayTime.appendChild(dayTimeWeather);
  //   //
  //   //       const dayTimeWeatherMain = document.createElement('h4');
  //   //       dayTimeWeatherMain.textContent = dateTime.weather[0].main;
  //   //       dayTimeWeather.appendChild(dayTimeWeatherMain);
  //   //
  //   //       const dayTimeWeatherDescription = document.createElement('p');
  //   //       dayTimeWeatherDescription.textContent = dateTime.weather[0].description;
  //   //       dayTimeWeather.appendChild(dayTimeWeatherDescription);
  //   //     };
  //   //   })
  //   //   // console.log(timeWeather);
  //   //
  //   //
  //   //
  //   //
  //   // });
  //
  //   // dateItem.textContent = dayofDate;
  //   cityContainer.appendChild(dateItem);
  //   this.element = dateItem;
  //   this.element.addEventListener('click', (event) => {
  //     const selectedDate = event.srcElement.textContent;
  //     console.log(selectedDate);
  //   })
  // });


};

// CityWeatherView.prototype.addTimes = function(dateTimeArray, date) {
//   const dateTimes = dateTimeArray.filter((dateTime) => {
//     return dateTime[0] === date;
//   });
//   console.log(dateTimes);
//   return dateTimes;
// };
//
// CityWeatherView.prototype.generateData = function(){
//
// }

module.exports = CityWeatherView;
