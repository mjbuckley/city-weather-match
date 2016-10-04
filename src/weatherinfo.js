import React, { Component } from 'react';
import CityResults from './cityresults.js';
import './weatherinfo.css';

// I have to declare the variable outside the App class for it to work. Why?
const stationObj = require('./weather.json');


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
          
          <label htmlFor="maxtemp">Average high temperature in July is less than:</label>
          <br />
          <input
            type="range"
            id="maxtemp"
            min="30" max="130"
            step="1"
            value={this.state.maxTemp}
            onChange={this.changeMaxTemp}
          />
          { /* Consider using output tag, although there might be some IE issues to deal with */ }
          <span>{this.state.maxTemp} °F</span>
          <br />
          <label htmlFor="belowfreezing">Average number of where the temperature drops below freezing for at least part of the day:</label>
          <br />
          <input
            type="range"
            id="belowfreezing"
            min="0" max="365"
            step="1"
            value={this.state.below32}
            onChange={this.changeBelow32}
          />
          <span>{this.state.below32}</span>
          <br />
          <button type="submit">Find matches</button>
        </form>



        <CityResults matches={this.state.matches} clicked={this.state.clicked}/>

      </div>
    );
  }
}

export default WeatherInfo;
