import React, { Component } from 'react';
import { hashHistory } from 'react-router'
import WeatherRangeInput from '../components/weatherrangeinput.js';
import findMatches from '../utils/findmatches.js';
import '../css/search.css';

// Min, max, and midway possible values for each weather category.
const inputMinMax = require('../data/inputminmax.json');

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {...this.props.weatherValues};
    this.fetchData = this.fetchData.bind(this);
    this.changeSliderValue = this.changeSliderValue.bind(this);
  }

  fetchData(evt) {
    evt.preventDefault();

    // Grab weatherValues from state (probably don't need new object, but no real harm in doing this)
    const weatherValues = Object.assign({}, this.state);

    // Find matches
    const matches = findMatches(weatherValues);

    const updatedInfo = {
      "weatherValues": weatherValues,
      "matches": matches,
      "isActive": true
    };

    // Update state
    this.props.updateWeatherState(updatedInfo);

    // Build redirect link
    const link = {
      pathname: "/results",
      query: weatherValues
    };

    // Redirect to results page
    hashHistory.push(link);
  }


  changeSliderValue(evt) {
    this.setState({
      [evt.target.id]: evt.target.value
    });
  };


  render() {
    return (
      <div className="search-container">
        <div className="search">
          <h2 className="search-header">Weather Options</h2>
          <form onSubmit={this.fetchData}>
            <section className="search-heat">
              <h3>Heat</h3>
              <WeatherRangeInput
                id="hMTmxAvLe"
                description="The average high temperature durring the hottest month of the year is at most"
                min={inputMinMax["hMTmxAvLe"][0]}
                max={inputMinMax["hMTmxAvLe"][1]}
                value={this.state.hMTmxAvLe}
                onChange={this.changeSliderValue}
                unit="°F"
              />
              <br />
              <WeatherRangeInput
                id="andTmxGe60Le"
                description="The average number of days where the temperature gets to at least 60 is at most"
                min={inputMinMax["andTmxGe60Le"][0]}
                max={inputMinMax["andTmxGe60Le"][1]}
                value={this.state.andTmxGe60Le}
                onChange={this.changeSliderValue}
                unit=""
              />
              <br />
              <WeatherRangeInput
                id="andTmxGe60Ge"
                description="The average number of days where the temperature gets to at least 60 is at least"
                min={inputMinMax["andTmxGe60Ge"][0]}
                max={inputMinMax["andTmxGe60Ge"][1]}
                value={this.state.andTmxGe60Ge}
                onChange={this.changeSliderValue}
                unit=""
              />
              <br />
              <WeatherRangeInput
                id="andTmxGe80Le"
                description="The average number of days where the temperature gets to at least 80 is at most"
                min={inputMinMax["andTmxGe80Le"][0]}
                max={inputMinMax["andTmxGe80Le"][1]}
                value={this.state.andTmxGe80Le}
                onChange={this.changeSliderValue}
                unit=""
              />
              <br />
              <WeatherRangeInput
                id="andTmxGe80Ge"
                description="The average number of days where the temperature gets to at least 80 is at least"
                min={inputMinMax["andTmxGe80Ge"][0]}
                max={inputMinMax["andTmxGe80Ge"][1]}
                value={this.state.andTmxGe80Ge}
                onChange={this.changeSliderValue}
                unit=""
              />
            </section>
            <section className="search-cold">
              <h3>Cold</h3>
              <WeatherRangeInput
                id="lMTmnAvGe"
                description="The average low temperature durring the coldest month of the year is greater than"
                min={inputMinMax["lMTmnAvGe"][0]}
                max={inputMinMax["lMTmnAvGe"][1]}
                value={this.state.lMTmnAvGe}
                onChange={this.changeSliderValue}
                unit="°F"
              />
              <br />
              <WeatherRangeInput
                id="andTmnLe32Le"
                description="The average number of days where the temperature drops below freezing is at most"
                min={inputMinMax["andTmnLe32Le"][0]}
                max={inputMinMax["andTmnLe32Le"][1]}
                value={this.state.andTmnLe32Le}
                onChange={this.changeSliderValue}
                unit=""
              />
              <br />
              <WeatherRangeInput
                id="andTmnLe32Ge"
                description="The average number of days where the temperature drops below freezing is at least"
                min={inputMinMax["andTmnLe32Ge"][0]}
                max={inputMinMax["andTmnLe32Ge"][1]}
                value={this.state.andTmnLe32Ge}
                onChange={this.changeSliderValue}
                unit=""
              />
            </section>
            <section className="search-precip">
              <h3>Precipitation</h3>
              <WeatherRangeInput
                id="andSnGe1Le"
                description="The average number of days with an inch or more snowfall is at most"
                min={inputMinMax["andSnGe1Le"][0]}
                max={inputMinMax["andSnGe1Le"][1]}
                value={this.state.andSnGe1Le}
                onChange={this.changeSliderValue}
                unit=""
              />
              <br />
              <WeatherRangeInput
                id="andSnGe1Ge"
                description="The average number of days with an inch or more snowfall is at least"
                min={inputMinMax["andSnGe1Ge"][0]}
                max={inputMinMax["andSnGe1Ge"][1]}
                value={this.state.andSnGe1Ge}
                onChange={this.changeSliderValue}
                unit=""
              />
              <br />
              <WeatherRangeInput
                id="andSnCGe1Le"
                description="The average number of days when there is at least an inch of snow on the ground is at most"
                min={inputMinMax["andSnCGe1Le"][0]}
                max={inputMinMax["andSnCGe1Le"][1]}
                value={this.state.andSnCGe1Le}
                onChange={this.changeSliderValue}
                unit=""
              />
              <br />
              <WeatherRangeInput
                id="andSnCGe1Ge"
                description="The average number of days when there is at least an inch of snow on the ground is at least"
                min={inputMinMax["andSnCGe1Ge"][0]}
                max={inputMinMax["andSnCGe1Ge"][1]}
                value={this.state.andSnCGe1Ge}
                onChange={this.changeSliderValue}
                unit=""
              />
              <br />
              <WeatherRangeInput
                id="andPrGe5TiLe"
                description="The average number of rainy days (at least 1/2 inch precipitation) is at most"
                min={inputMinMax["andPrGe5TiLe"][0]}
                max={inputMinMax["andPrGe5TiLe"][1]}
                value={this.state.andPrGe5TiLe}
                onChange={this.changeSliderValue}
                unit=""
              />
              <br />
              <WeatherRangeInput
                id="andPrGe5TiGe"
                description="The average number of rainy days (at least 1/2 inch precipitation) is at least"
                min={inputMinMax["andPrGe5TiGe"][0]}
                max={inputMinMax["andPrGe5TiGe"][1]}
                value={this.state.andPrGe5TiGe}
                onChange={this.changeSliderValue}
                unit=""
              />
            </section>
            <button className="search-button" type="submit">Find matches</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;


// Old working but probably not needed onChange functions.
//
// // Below functions update values on range input change
// changemTmxAv(evt) {
//   this.setState({
//     mTmxAv: evt.target.value
//   });
// };
//
// changemTmnAv(evt) {
//   this.setState({
//     mTmnAv: evt.target.value
//   });
// };
//
// changeandTmnLe32(evt) {
//   this.setState({
//     andTmnLe32: evt.target.value
//   });
// };
//
// changeandSnGe1(evt) {
//   this.setState({
//     andSnGe1: evt.target.value
//   });
// };
//
// changeandSnCGe1(evt) {
//   this.setState({
//     andSnCGe1: evt.target.value
//   });
// };
//
// changeandPrGe5Ti(evt) {
//   this.setState({
//     andPrGe5Ti: evt.target.value
//   });
// };



// Old working state. I think my new think should work but keeping just in case
// this.state = {
//   hMTmxAvLe: this.props.weatherValues.hMTmxAvLe,
//   lMTmnAvGe: this.props.lMTmnAvGe,
//   andSnGe1Le: this.props.andSnGe1Le,
//   andSnGe1Ge: this.props.andSnGe1Ge,
//   andSnCGe1Le: this.props.andSnCGe1Le,
//   andSnCGe1Ge: this.props.andSnCGe1Ge,
//   andPrGe5TiLe: this.props.andPrGe5TiLe,
//   andPrGe5TiGe: this.props.andPrGe5TiGe,
//   andTmnLe32Le: this.props.andTmnLe32Le,
//   andTmnLe32Ge: this.props.andTmnLe32Ge,
//   andTmxGe60Le: this.props.andTmxGe60Le,
//   andTmxGe60Ge: this.props.andTmxGe60Ge,
//   andTmxGe80Le: this.props.andTmxGe80Le,
//   andTmxGe80Ge: this.props.andTmxGe80Ge
// };

// Probably not going to use like this. If I do, change capitalization?
// this.changehMTmxAvLe = this.changehMTmxAvLe.bind(this);
// this.changelMTmnAvGe = this.changelMTmnAvGe.bind(this);
// this.changeandSnGe1Le = this.changeandSnGe1Le.bind(this);
// this.changeandSnGe1Ge = this.changeandSnGe1Ge.bind(this);
// this.changeandSnCGe1Le = this.changeandSnCGe1Le.bind(this);
// this.changeandSnCGe1Ge = this.changeandSnCGe1Ge.bind(this);
// this.changeandPrGe5TiLe = this.changeandPrGe5TiLe.bind(this);
// this.changeandPrGe5TiGe = this.changeandPrGe5TiGe.bind(this);
// this.changeandTmnLe32Le = this.changeandTmnLe32Le.bind(this);
// this.changeandTmnLe32Ge = this.changeandTmnLe32Ge.bind(this);
// this.changeandTmxGe60Le = this.changeandTmxGe60Le.bind(this);
// this.changeandTmxGe60Ge = this.changeandTmxGe60Ge.bind(this);
// this.changeandTmxGe80Le = this.changeandTmxGe80Le.bind(this);
// this.changeandTmxGe80Ge = this.changeandTmxGe80Ge.bind(this);
