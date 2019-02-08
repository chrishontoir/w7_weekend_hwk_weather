const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');
const cityCodes = require('../data/city.list.json')

const Weather = function() {
  this.data = null;
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
      // console.log(this.data);
      PubSub.publish('Weather:city-found', this.data);
    });
    // .catch((err) => {
    //   // PubSub.publish('Weather:error', err);
    // });
};

module.exports = Weather;
