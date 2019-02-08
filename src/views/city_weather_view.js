const PubSub = require('../helpers/pub_sub.js');

const CityWeatherView = function(container) {
  this.container = container;
};

CityWeatherView.prototype.bindEvents = function() {
  PubSub.subscribe('Weather:city-found', (event) => {
    const cityData = event.detail;
    console.log(cityData);
    this.render(cityData);
  });
};

CityWeatherView.prototype.render = function(cityData) {
  this.container.innerHTML = "";
  const cityContainer = document.createElement('div');
  this.container.appendChild(cityContainer);

  const cityName = document.createElement('h1');
  cityName.textContent = cityData.city.name;
  cityContainer.appendChild(cityName);

  const cityCountry = document.createElement('h2');
  cityCountry.textContent = cityData.city.country;
  cityContainer.appendChild(cityCountry);

  const dateArray = [];
  const dateTimeArray = [];
  cityData.list.forEach((date) => {
    const splitData = date.dt_txt.split(" ");
    dateArray.push(splitData[0]);
    dateTimeArray.push(splitData);
    // const dateItem = document.createElement('li');
    // dateItem.textContent = date.dt_txt;
    // cityContainer.appendChild(dateItem);
  });
  const uniqueDates = new Set(dateArray);
  uniqueArray = Array.from(uniqueDates);
  console.log(uniqueArray);

  const dateList = uniqueArray.forEach((date) => {
    const dateItem = document.createElement('div');
    const dayofDate = new Date(date).toDateString();
    const dayOfDateArray = dayofDate.split(" ");

    const dayDay = document.createElement('h3');
    dayDay.textContent = dayOfDateArray[0];
    dateItem.appendChild(dayDay);

    const dayDate = document.createElement('p');
    dayDate.textContent = `${dayOfDateArray[2]} ${dayOfDateArray[1]} ${dayOfDateArray[3]}`
    dateItem.appendChild(dayDate);
    // const times = this.addTimes(dateTimeArray, date);
    // times.forEach((time) => {
    //   const dayTime = document.createElement('div');
    //   dayTime.textContent = time[1];
    //   dateItem.appendChild(dayTime);
    //
    //   // const timeWeather = cityData.list.filter((dateTime) => {
    //   //   dateTime.dt_txt == time[0] + " " + time[1];
    //   //   console.log(dateTime.dt_txt);
    //   // });
    //
    //   cityData.list.forEach((dateTime) => {
    //     if (dateTime.dt_txt === time[0] + " " + time[1]) {
    //       const dayTimeWeather = document.createElement('div');
    //
    //       dayTime.appendChild(dayTimeWeather);
    //
    //       const dayTimeWeatherMain = document.createElement('h4');
    //       dayTimeWeatherMain.textContent = dateTime.weather[0].main;
    //       dayTimeWeather.appendChild(dayTimeWeatherMain);
    //
    //       const dayTimeWeatherDescription = document.createElement('p');
    //       dayTimeWeatherDescription.textContent = dateTime.weather[0].description;
    //       dayTimeWeather.appendChild(dayTimeWeatherDescription);
    //     };
    //   })
    //   // console.log(timeWeather);
    //
    //
    //
    //
    // });

    // dateItem.textContent = dayofDate;
    cityContainer.appendChild(dateItem);
  });
};

CityWeatherView.prototype.addTimes = function(dateTimeArray, date) {
  const dateTimes = dateTimeArray.filter((dateTime) => {
    return dateTime[0] === date;
  });
  console.log(dateTimes);
  return dateTimes;
};

CityWeatherView.prototype.generateData = function(){

}

module.exports = CityWeatherView;
