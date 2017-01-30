import React, { Component } from 'react';
import { hashHistory } from 'react-router'
import WeatherRangeInput from './weatherrangeinput.js';
import findMatches from './findmatches.js';
import './css/search.css';

// Min, max, and midway possible values for each weather category.
const weatherConst = require('./data/minmax.json');

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxTemp: this.props.maxTemp,
      lowTemp: this.props.lowTemp,
      below32: this.props.below32,
      snowfall: this.props.snowfall,
      precip: this.props.precip
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

    let weatherObj = {
      maxTemp: parseInt(this.state.maxTemp, 10),
      lowTemp: parseInt(this.state.lowTemp, 10),
      below32: parseInt(this.state.below32, 10),
      snowfall: parseInt(this.state.snowfall, 10),
      precip: parseInt(this.state.precip, 10)
    };

    // Find matches
    let matches = findMatches(weatherObj);

    // Add matches to weatherObj
    weatherObj["matches"] = matches;

    // Update state
    this.props.updateWeatherState(weatherObj);

    // Redirect to results page
    hashHistory.push('/results');
  }

  // Below functions update values on range input change
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
      <div className="Search">
        <h2>Weather Options</h2>
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
      </div>
    );
  }
}

export default Search;
