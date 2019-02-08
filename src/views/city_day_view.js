const CityDayView = function(container, data, date) {
  this.container = container;
  this.data = data;
  this.date = date;
  this.element = document.querySelector('#weather-times')
};

CityDayView.prototype.getData = function(){
  const actual = this.data.uniqueDates.filter((date) => {
    return date.date === this.date;
  });
  this.render(actual);
};

CityDayView.prototype.render = function(array) {
  this.element.innerHTML = "";

  console.log(array[0].times[0]);

  array[0].times[0].forEach((time) => {
    console.log(time.dt_txt);
    console.log(time.weather[0].main);

    const timeContainer = document.createElement('div');
    this.element.appendChild(timeContainer);

    const weatherTime = document.createElement('h4');
    weatherTime.textContent = time.dt_txt;
    timeContainer.appendChild(weatherTime);

    const main = document.createElement('p');
    main.textContent = time.weather[0].main;
    timeContainer.appendChild(main);

    const description = document.createElement('p');
    description.textContent = time.weather[0].description;
    timeContainer.appendChild(description);


  })
}

module.exports = CityDayView;
