import React, { Component } from 'react';
import CityResults from './cityresults.js';
import MaxTempSlider from './maxtempslider.js';
import WeatherRangeInput from './weatherrangeinput.js';
import './weatherinfo.css';

// TO DO:
// (1) Add more weather info
// (2) Work on naming: state names and stationsObj/minmax names should be the same.
// (3) Figure out about organizing results in a meaningful way (probably aphabetical)
// (4) Figure out about adding state info, differentiating between cities with the same
// name, dealing with multiple results from the same city (plus excluded results from
// the same city), and grouping by metro area.
// (5) Add the plotly graphs option to the results.


// Note: I seem to have to declare these constants outside of the weatherinfo
// class for them to work. Is this ok? Is it because they require files or
// something else.

// The need weather info for the NOAA stations.
const stationsObj = require('./weather.json');

// Min and max possible values for each weather category
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
    for (let station in stationsObj) {
      // Only checking July (6) for now, see below note about parseInt
      // Also, should parseInt be used for state values?
      if (parseInt(stationsObj[station]["temp"]["mlyTMaxAvg"][6], 10) < this.state.maxTemp &&
          parseInt(stationsObj[station]["temp"]["daysBelow32"], 10) < this.state.below32) {
        let value = {};
        value[station] = stationsObj[station];
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
