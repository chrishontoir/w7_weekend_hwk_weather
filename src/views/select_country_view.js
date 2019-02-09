const PubSub = require('../helpers/pub_sub.js');

const SelectCountryView = function(form) {
  this.element = form;
};

SelectCountryView.prototype.bindEvents = function() {
  PubSub.subscribe('Weather:unique-city-array', (event) => {
    const cityArray = event.detail;
    cityArray.forEach((cityObject) => {
      const option = document.createElement('option');
      option.textContent = `${cityObject.name}, ${cityObject.country}`;
      option.value = cityObject.id;
      this.element.appendChild(option);
    });
  });




  this.element.addEventListener('change', (event) => {
    event.preventDefault();
    const selectedCountry = event.target.value;
    console.log(selectedCountry);
    PubSub.publish('SelectCountryView:country-selected', selectedCountry);
    const typeCity = document.querySelector('#select-city');
    typeCity.focus()
  });
}

module.exports = SelectCountryView;
