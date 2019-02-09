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

    // const icon = document.createElement('img');
    // icon.src=`http://openweathermap.org/img/w/${time.weather[0].icon}.png`;
    // timeContainer.appendChild(icon);

    const icon = document.createElement('i');
    icon.classList.add(`wi`);
    icon.classList.add(`red`);
    icon.classList.add(`wi-owm-${time.weather[0].id}`);
    // icon.src=`http://openweathermap.org/img/w/${time.weather[0].icon}.png`;
    timeContainer.appendChild(icon);

    const weatherTime = document.createElement('h4');
    weatherTime.innerHTML = `${adjustedTime[0]}<span>${adjustedTime[1]}</span>`;
    timeContainer.appendChild(weatherTime);

    const main = document.createElement('p');
    main.textContent = time.weather[0].main;
    timeContainer.appendChild(main);

    const description = document.createElement('p');
    description.textContent = time.weather[0].description;
    timeContainer.appendChild(description);

    const temp = document.createElement('p');
    const rounded = Math.round(time.main.temp);
    temp.innerHTML = `${rounded}&deg`;
    timeContainer.appendChild(temp);

    const windDir = document.createElement('i');
    windDir.classList.add(`wi`);
    windDir.classList.add(`wi-wind`);
    const roundDeg = Math.round(time.wind.deg);
    windDir.classList.add(`from-${roundDeg}-deg`);
    // icon.src=`http://openweathermap.org/img/w/${time.weather[0].icon}.png`;
    timeContainer.appendChild(windDir);




  })
}

CityDayView.prototype.adjustTime = function(actualJustTime) {
  const time = actualJustTime.getHours();
  if (time === 0) {
    return ["12","am"];
  }
  else if (time === 3) {
    return ["3","am"];
  }
  else if (time === 6) {
    return ["6","am"];
  }
  else if (time === 9) {
    return ["9","am"];
  }
  else if (time === 12) {
    return ["12","pm"];
  }
  else if (time === 15) {
    return ["3","pm"];
  }
  else if (time === 18) {
    return ["6","pm"];
  }
  else if (time === 21) {
    return ["9","pm"];
  }
}



module.exports = CityDayView;
