import React, { Component } from 'react';
import CityResults from './cityresults.js';
import MaxTempSlider from './maxtempslider.js';
import WeatherRangeInput from './weatherrangeinput.js';
import './weatherinfo.css';

// I have to declare the variable outside the App class for it to work. Why?
const stationObj = require('./weather.json');

// For test purposes. Eventually pull this from an auto generated file.
// const weatherConst = { maxTemp: [30, 130], below32: [0, 365] };
const weatherConst = require('./minmax.json');


class WeatherInfo extends Component {
  constructor() {
    super();
    this.state = {
      maxTemp: '80',
      snow: [],
      matches: [],
      below32: '0',
      clicked: false
    };
    this.fetchData = this.fetchData.bind(this);
    this.changeMaxTemp = this.changeMaxTemp.bind(this);
    this.changeBelow32 = this.changeBelow32.bind(this);
  }

  fetchData(evt) {
    evt.preventDefault();

    let stationMatch = [];
    for (let station in stationObj) {
      // Only checking July (6) for now, see below note about parseInt
      // Also, should parseInt be used for state values?
      if (parseInt(stationObj[station]["temp"]["mlyTMaxAvg"][6], 10) < this.state.maxTemp &&
          parseInt(stationObj[station]["temp"]["daysBelow32"], 10) < this.state.below32) {
        let value = {};
        value[station] = stationObj[station];
        stationMatch.push(value);
      };
    };
    this.setState({matches: stationMatch});
    this.setState({clicked: true});
  };

changeMaxTemp(evt) {
  this.setState({
    maxTemp: evt.target.value
  });
};

changeBelow32(evt) {
  this.setState({
    below32: evt.target.value
  });
};


  render() {
    return (
      <div className="WeatherInfo">
        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <WeatherRangeInput
            id="maxTemp"
            description="Maximum average high temperature in July"
            min={weatherConst["mlyTMaxAvg"][0]}
            max={weatherConst["mlyTMaxAvg"][1]}
            value={this.state.maxTemp}
            onChange={this.changeMaxTemp}
            output="°F"
          />
          <br />
          <WeatherRangeInput
            id="below32"
            description="Average number of where the temperature drops below freezing for at least part of the day"
            min={weatherConst["daysBelow32"][0]}
            max={weatherConst["daysBelow32"][1]}
            value={this.state.below32}
            onChange={this.changeBelow32}
            output=""
          />
          <br />
          <button type="submit">Find matches</button>
        </form>
        <CityResults matches={this.state.matches} clicked={this.state.clicked}/>
      </div>
    );
  }
}

export default WeatherInfo;
