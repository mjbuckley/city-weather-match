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
      maxTemp: '80',
      lowTemp: '40',
      snowfall: '10',
      precip: '10',
      matches: [],
      below32: '0',
      clicked: false
    };
    this.fetchData = this.fetchData.bind(this);
    this.changeMaxTemp = this.changeMaxTemp.bind(this);
    this.changeLowTemp = this.changeLowTemp.bind(this);
    this.changeBelow32 = this.changeBelow32.bind(this);
    this.changeSnowfall = this.changeSnowfall.bind(this);
    this.changePrecip = this.changePrecip.bind(this);
  }

  fetchData(evt) {
    evt.preventDefault();

    let stationMatch = [];
    for (let station in stationsObj) {
      if (parseInt(stationsObj[station]["mlyTMaxAvg"][12], 10) < this.state.maxTemp &&
          parseInt(stationsObj[station]["mlyTMinAvg"][12], 10) > this.state.lowTemp &&
          parseInt(stationsObj[station]["daysBelow32"], 10) < this.state.below32 &&
          parseInt(stationsObj[station]["annInchPlus"], 10) < this.state.snowfall &&
          parseInt(stationsObj[station]["annprcpge050hi"], 10) < this.state.precip) {
        stationMatch.push(station);
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

changeLowTemp(evt) {
  this.setState({
    lowTemp: evt.target.value
  });
};

changeBelow32(evt) {
  this.setState({
    below32: evt.target.value
  });
};

changeSnowfall(evt) {
  this.setState({
    snowfall: evt.target.value
  });
};

changePrecip(evt) {
  this.setState({
    precip: evt.target.value
  });
};


  render() {
    return (
      <div className="WeatherInfo">
        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <WeatherRangeInput
            id="maxTemp"
            description="The average high temperature durring the hottest month of the year is less than"
            min={weatherConst["mlyTMaxAvg"][0]}
            max={weatherConst["mlyTMaxAvg"][1]}
            value={this.state.maxTemp}
            onChange={this.changeMaxTemp}
            unit="°F"
          />
          <br />
          <WeatherRangeInput
            id="lowTemp"
            description="The average low temperature durring the coldest month of the year is greater than"
            min={weatherConst["mlyTMinAvg"][0]}
            max={weatherConst["mlyTMinAvg"][1]}
            value={this.state.lowTemp}
            onChange={this.changeLowTemp}
            unit="°F"
          />
          <br />
          <WeatherRangeInput
            id="below32"
            description="The average number of days where the temperature drops below freezing is less than"
            min={weatherConst["daysBelow32"][0]}
            max={weatherConst["daysBelow32"][1]}
            value={this.state.below32}
            onChange={this.changeBelow32}
            unit=""
          />
          <br />
          <WeatherRangeInput
            id="snowfall"
            description="The average number of days with an inch or more snowfall is less than"
            min={weatherConst["annInchPlus"][0]}
            max={weatherConst["annInchPlus"][1]}
            value={this.state.snowfall}
            onChange={this.changeSnowfall}
            unit=""
          />
          <br />
          <WeatherRangeInput
            id="precip"
            description="The average number of rainy days (at least 1/2 inch precipitation) is less than"
            min={weatherConst["annprcpge050hi"][0]}
            max={weatherConst["annprcpge050hi"][1]}
            value={this.state.precip}
            onChange={this.changePrecip}
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
