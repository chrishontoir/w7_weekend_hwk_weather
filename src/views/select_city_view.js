const PubSub = require('../helpers/pub_sub.js');

const SelectCityView = function(form) {
  this.form = form;
};


SelectCityView.prototype.bindEvents = function() {
  this.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const cityName = event.target['select-city'].value;
    console.log(cityName);
    PubSub.publish('SelectCityView:city-input', cityName);
    event.target.reset();
  });
};

module.exports = SelectCityView;
