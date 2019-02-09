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

    const justTime = time.dt_txt.split(" ");
    const actualJustTime = new Date(time.dt_txt);
    const adjustedTime = this.adjustTime(actualJustTime);
    console.log(adjustedTime);
    console.log(time.dt_txt);
    console.log(time.weather[0].main);

    const timeContainer = document.createElement('div');
    this.element.appendChild(timeContainer);

    const icon = document.createElement('img');
    icon.src=`http://openweathermap.org/img/w/${time.weather[0].icon}.png`;
    timeContainer.appendChild(icon);

    const weatherTime = document.createElement('h4');
    weatherTime.textContent = adjustedTime;
    timeContainer.appendChild(weatherTime);

    const main = document.createElement('p');
    main.textContent = time.weather[0].main;
    timeContainer.appendChild(main);

    const description = document.createElement('p');
    description.textContent = time.weather[0].description;
    timeContainer.appendChild(description);




  })
}

CityDayView.prototype.adjustTime = function(actualJustTime) {
  const time = actualJustTime.getHours();
  if (time === 0) {
    return "12am";
  }
  else if (time === 3) {
    return "3am";
  }
  else if (time === 6) {
    return "6am";
  }
  else if (time === 9) {
    return "9am";
  }
  else if (time === 12) {
    return "12pm";
  }
  else if (time === 15) {
    return "3pm";
  }
  else if (time === 18) {
    return "6pm";
  }
  else if (time === 21) {
    return "9pm";
  }
}



module.exports = CityDayView;
