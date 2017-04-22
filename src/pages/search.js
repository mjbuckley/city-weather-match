import React, { Component } from 'react';
import { hashHistory } from 'react-router'
import WeatherRangeInput from '../components/weatherrangeinput.js';
import findMatches from '../utils/findmatches.js';
import buildParams from '../utils/buildparams.js';
import '../css/search.css';

// Min, max, and midway possible values for each weather category.
const weatherConst = require('../data/minmax.json');

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mTmxAv: this.props.mTmxAv,
      mTmnAv: this.props.mTmnAv,
      andTmnLe32: this.props.andTmnLe32,
      andSnGe1: this.props.andSnGe1,
      andSnCGe1: this.props.andSnCGe1,
      andPrGe5Ti: this.props.andPrGe5Ti
    };
    this.fetchData = this.fetchData.bind(this);
    this.changemTmxAv = this.changemTmxAv.bind(this);
    this.changemTmnAv = this.changemTmnAv.bind(this);
    this.changeandTmnLe32 = this.changeandTmnLe32.bind(this);
    this.changeandSnGe1 = this.changeandSnGe1.bind(this);
    this.changeandSnCGe1 = this.changeandSnCGe1.bind(this);
    this.changeandPrGe5Ti = this.changeandPrGe5Ti.bind(this);
  }

  fetchData(evt) {
    evt.preventDefault();

    let weatherObj = {
      mTmxAv: parseInt(this.state.mTmxAv, 10),
      mTmnAv: parseInt(this.state.mTmnAv, 10),
      andTmnLe32: parseInt(this.state.andTmnLe32, 10),
      andSnGe1: parseInt(this.state.andSnGe1, 10),
      andSnCGe1: parseInt(this.state.andSnCGe1, 10),
      andPrGe5Ti: parseInt(this.state.andPrGe5Ti, 10),
      isActive: true
    };

    // Find matches
    const matches = findMatches(weatherObj);

    // Add matches to weatherObj
    weatherObj["matches"] = matches;

    // Update state
    this.props.updateWeatherState(weatherObj);

    // Build redirect link
    const path = "/results";
    const query = buildParams(weatherObj);
    const link = {
      pathname: path,
      query: query
    };

    // Redirect to results page
    hashHistory.push(link);
  }

  // Below functions update values on range input change
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

  changeandSnCGe1(evt) {
    this.setState({
      andSnCGe1: evt.target.value
    });
  };

  changeandPrGe5Ti(evt) {
    this.setState({
      andPrGe5Ti: evt.target.value
    });
  };


  render() {
    return (
      <div className="search-container">
        <div className="search">
          <h2>Weather Options</h2>
          <form onSubmit={this.fetchData}>

            <section className="search-heat">
              <h3>Heat</h3>
              <WeatherRangeInput
                id="mTmxAv"
                description="The average high temperature durring the hottest month of the year is less than"
                min={weatherConst["mTmxAv"][0]}
                max={weatherConst["mTmxAv"][1]}
                value={this.state.mTmxAv}
                onChange={this.changemTmxAv}
                unit="°F"
              />
            </section>

            <section className="search-cold">
              <h3>Cold</h3>
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
            </section>

            <section className="search-precip">
              <h3>Precipitation</h3>
              <WeatherRangeInput
                id="andSnGe1"
                description="The average number of days with an inch or more snowfall is less than"
                min={weatherConst["andSnGe1"][0]}
                max={weatherConst["andSnGe1"][1]}
                value={this.state.andSnGe1}
                onChange={this.changeandSnGe1}
                unit=""
              />
              <br />
              <WeatherRangeInput
                id="andSnCGe1"
                description="The average number of days when there is at least an inch of snow on the ground"
                min={weatherConst["andSnCGe1"][0]}
                max={weatherConst["andSnCGe1"][1]}
                value={this.state.andSnCGe1}
                onChange={this.changeandSnCGe1}
                unit=""
              />
              <br />
              <WeatherRangeInput
                id="andPrGe5Ti"
                description="The average number of rainy days (at least 1/2 inch precipitation) is less than"
                min={weatherConst["andPrGe5Ti"][0]}
                max={weatherConst["andPrGe5Ti"][1]}
                value={this.state.andPrGe5Ti}
                onChange={this.changeandPrGe5Ti}
                unit=""
              />
            </section>

            <button type="submit">Find matches</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
