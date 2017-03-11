// TO DO:
// (1) Add more weather info
// (2) Work on naming: state names and stationsObj/minmax names should be the same.
// (3) Figure out about organizing results in a meaningful way (probably aphabetical)
// (4) Figure out about adding state info, differentiating between cities with the same
// name, dealing with multiple results from the same city (plus excluded results from
// the same city), and grouping by metro area.
// (5) Add the plotly graphs option to the results.
// (6) Is there a better place for me to declare json constants?


import React, { Component } from 'react';
import CityResults from './cityresults.js';
import WeatherRangeInput from './weatherrangeinput.js';
import './css/weatherinfo.css';

// The weather info for the NOAA stations.
const stationsObj = require('./data/weather.json');

// Min and max possible values for each weather category
const weatherConst = require('./data/minmax.json');


// Replace default values with something more meaningful at some point
class WeatherInfo extends Component {
  constructor() {
    super();
    this.state = {
      mTmxAv: '80',
      mTmnAv: '40',
      andSnGe1: '10',
      andPrGe5Ti: '10',
      matches: [],
      andTmnLe32: '0',
      clicked: false
    };
    this.fetchData = this.fetchData.bind(this);
    this.changemTmxAv = this.changemTmxAv.bind(this);
    this.changemTmnAv = this.changemTmnAv.bind(this);
    this.changeandTmnLe32 = this.changeandTmnLe32.bind(this);
    this.changeandSnGe1 = this.changeandSnGe1.bind(this);
    this.changeandPrGe5Ti = this.changeandPrGe5Ti.bind(this);
  }

  fetchData(evt) {
    evt.preventDefault();

    let stationMatch = [];
    for (let station in stationsObj) {
      if (parseInt(stationsObj[station]["mTmxAv"][12], 10) < this.state.mTmxAv &&
          parseInt(stationsObj[station]["mTmnAv"][12], 10) > this.state.mTmnAv &&
          parseInt(stationsObj[station]["andTmnLe32"], 10) < this.state.andTmnLe32 &&
          parseInt(stationsObj[station]["andSnGe1"], 10) < this.state.andSnGe1 &&
          parseInt(stationsObj[station]["andPrGe5Ti"], 10) < this.state.andPrGe5Ti) {
        stationMatch.push(station);
      };
    };
    this.setState({matches: stationMatch});
    this.setState({clicked: true});
  };

changemTmxAv(evt) {
  this.setState({
    mTmxAv: evt.target.value
  });
};

changemTmnAv(evt) {
  this.setState({
    mTmnAv: evt.target.value
  });
};

changeandTmnLe32(evt) {
  this.setState({
    andTmnLe32: evt.target.value
  });
};

changeandSnGe1(evt) {
  this.setState({
    andSnGe1: evt.target.value
  });
};

changeandPrGe5Ti(evt) {
  this.setState({
    andPrGe5Ti: evt.target.value
  });
};


  render() {
    return (
      <div className="WeatherInfo">
        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <WeatherRangeInput
            id="mTmxAv"
            description="The average high temperature durring the hottest month of the year is less than"
            min={weatherConst["mTmxAv"][0]}
            max={weatherConst["mTmxAv"][1]}
            value={this.state.mTmxAv}
            onChange={this.changemTmxAv}
            unit="°F"
          />
          <br />
          <WeatherRangeInput
            id="mTmnAv"
            description="The average low temperature durring the coldest month of the year is greater than"
            min={weatherConst["mTmnAv"][0]}
            max={weatherConst["mTmnAv"][1]}
            value={this.state.mTmnAv}
            onChange={this.changemTmnAv}
            unit="°F"
          />
          <br />
          <WeatherRangeInput
            id="andTmnLe32"
            description="The average number of days where the temperature drops below freezing is less than"
            min={weatherConst["andTmnLe32"][0]}
            max={weatherConst["andTmnLe32"][1]}
            value={this.state.andTmnLe32}
            onChange={this.changeandTmnLe32}
            unit=""
          />
          <br />
          <WeatherRangeInput
            id="andSnGe1"
            description="The average number of days with an inch or more andSnGe1 is less than"
            min={weatherConst["andSnGe1"][0]}
            max={weatherConst["andSnGe1"][1]}
            value={this.state.andSnGe1}
            onChange={this.changeandSnGe1}
            unit=""
          />
          <br />
          <WeatherRangeInput
            id="andPrGe5Ti"
            description="The average number of rainy days (at least 1/2 inch andPrGe5Tiitation) is less than"
            min={weatherConst["andPrGe5Ti"][0]}
            max={weatherConst["andPrGe5Ti"][1]}
            value={this.state.andPrGe5Ti}
            onChange={this.changeandPrGe5Ti}
            unit=""
          />
          <br />
          <button type="submit">Find matches</button>
        </form>
        <CityResults matches={this.state.matches} stationsobj={stationsObj} clicked={this.state.clicked}/>
      </div>
    );
  }
}

export default WeatherInfo;
