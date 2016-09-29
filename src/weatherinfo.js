import React, { Component } from 'react';
import CityResults from './cityresults.js';

// I have to declare the variable outside the App class for it to work. Why?
const stationObj = require('./weather.json');


class WeatherInfo extends Component {
  constructor() {
    super();
    this.state = {
      maxTemp: '',
      snow: [],
      matches: [],
      testValue: '0'
    };
    this.fetchData = this.fetchData.bind(this);
    this.changeMaxTemp = this.changeMaxTemp.bind(this);
    this.changeTestValue = this.changeTestValue.bind(this);
  }

  fetchData(evt) {
    evt.preventDefault();

    let stationMatch = [];
    for (let station in stationObj) {
      // Only checking July (6) for now, see below note about parseInt
      if (parseInt(stationObj[station]["temp"]["mlyTMaxAvg"][6], 10) < this.state.maxTemp) {
        let value = {};
        value[station] = stationObj[station];
        stationMatch.push(value);
      };
    };
    this.setState({matches: stationMatch});
  };

changeMaxTemp(evt) {
  this.setState({
    maxTemp: evt.target.value
  });
};

changeTestValue(evt) {
  this.setState({
    testValue: evt.target.value
  });
};


  render() {
    return (
      <div className="WeatherInfo">
        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <label>Enter max average temp
            <input
              placeholder={"Temp goes here"}
              type="text"
              value={this.state.maxTemp}
              onChange={this.changeMaxTemp}
            />
          </label>
          <br />
          <label for="belowfreezing">Average number of where the temperature drops below freezing for at least part of the day:</label>
          <input
            type="range"
            id="belowfreezing"
            min="0" max="365"
            step="1"
            value={this.state.testValue}
            onChange={this.changeTestValue}
          />
          <span>{this.state.testValue}</span>
        </form>



        <CityResults matches={this.state.matches} />

      </div>
    );
  }
}

export default WeatherInfo;
