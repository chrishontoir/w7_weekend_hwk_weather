const PubSub = require('../helpers/pub_sub.js');

const SelectCityView = function(form) {
  this.form = form;
};

SelectCityView.prototype.bindEvents = function() {
  this.form.addEventListener('submit', (event) => {
    const dropDown = document.querySelector('#select-country');
    dropDown.innerHTML = "<option selected disabled>";
    event.preventDefault();
    const cityName = event.target['select-city'].value;
    PubSub.publish('SelectCityView:city-input', cityName);
    event.target.reset();
    dropDown.focus();
  });
};

module.exports = SelectCityView;
