import React, { Component } from 'react';
import { hashHistory } from 'react-router'
import WeatherRangeInput from '../components/weatherrangeinput.js';
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
      <div className="search-wrapper">
        <div className="search">
          <h2 className="search-heading">Search</h2>
          <p>Chose your desired weather values on the sliders below and then click search to find the cities that meet your requirements.</p>
          <form onSubmit={this.fetchData}>
            <section className="search-heat">
              <h2>HEAT</h2>
              <fieldset>
                <legend>
                  The average number of days where the temperature gets to 60 °F or greater is:
                </legend>
                <WeatherRangeInput
                  id="andTmxGe60Ge"
                  label="AT LEAST"
                  min={inputMinMax["andTmxGe60Ge"][0]}
                  max={inputMinMax["andTmxGe60Ge"][1]}
                  value={this.state.andTmxGe60Ge}
                  onChange={this.changeSliderValue}
                  unit="DAYS"
                />
                <WeatherRangeInput
                  id="andTmxGe60Le"
                  label="AT MOST"
                  min={inputMinMax["andTmxGe60Le"][0]}
                  max={inputMinMax["andTmxGe60Le"][1]}
                  value={this.state.andTmxGe60Le}
                  onChange={this.changeSliderValue}
                  unit="DAYS"
                />
              </fieldset>
              <fieldset>
                <legend>
                The average number of days where the temperature gets to 80 °F or greater is:
                </legend>
                <WeatherRangeInput
                  id="andTmxGe80Ge"
                  label="AT LEAST"
                  min={inputMinMax["andTmxGe80Ge"][0]}
                  max={inputMinMax["andTmxGe80Ge"][1]}
                  value={this.state.andTmxGe80Ge}
                  onChange={this.changeSliderValue}
                  unit="DAYS"
                />
                <WeatherRangeInput
                  id="andTmxGe80Le"
                  label="AT MOST"
                  min={inputMinMax["andTmxGe80Le"][0]}
                  max={inputMinMax["andTmxGe80Le"][1]}
                  value={this.state.andTmxGe80Le}
                  onChange={this.changeSliderValue}
                  unit="DAYS"
                />
              </fieldset>
              <fieldset>
                <legend>
                  The average high temperature durring the hottest month of the year is:
                </legend>
                <WeatherRangeInput
                  id="hMTmxAvLe"
                  label="AT MOST"
                  min={inputMinMax["hMTmxAvLe"][0]}
                  max={inputMinMax["hMTmxAvLe"][1]}
                  value={this.state.hMTmxAvLe}
                  onChange={this.changeSliderValue}
                  unit="°F"
                />
              </fieldset>
            </section>
            <section className="search-cold">
              <h2>COLD</h2>
              <fieldset>
                <legend>
                  The average low temperature durring the coldest month of the year is:
                </legend>
                <WeatherRangeInput
                  id="lMTmnAvGe"
                  label="AT LEAST"
                  min={inputMinMax["lMTmnAvGe"][0]}
                  max={inputMinMax["lMTmnAvGe"][1]}
                  value={this.state.lMTmnAvGe}
                  onChange={this.changeSliderValue}
                  unit="°F"
                />
              </fieldset>
              <fieldset>
                <legend>
                  The average number of days where the temperature drops below freezing is:
                </legend>
                <WeatherRangeInput
                  id="andTmnLe32Ge"
                  label="AT LEAST"
                  min={inputMinMax["andTmnLe32Ge"][0]}
                  max={inputMinMax["andTmnLe32Ge"][1]}
                  value={this.state.andTmnLe32Ge}
                  onChange={this.changeSliderValue}
                  unit="DAYS"
                />
                <WeatherRangeInput
                  id="andTmnLe32Le"
                  label="AT MOST"
                  min={inputMinMax["andTmnLe32Le"][0]}
                  max={inputMinMax["andTmnLe32Le"][1]}
                  value={this.state.andTmnLe32Le}
                  onChange={this.changeSliderValue}
                  unit="DAYS"
                />
              </fieldset>
            </section>
            <section className="search-precip">
              <h2>PRECIPITATION</h2>
              <fieldset>
                <legend>
                  The average number of days with an inch or more snowfall is:
                </legend>
                <WeatherRangeInput
                  id="andSnGe1Ge"
                  label="AT LEAST"
                  min={inputMinMax["andSnGe1Ge"][0]}
                  max={inputMinMax["andSnGe1Ge"][1]}
                  value={this.state.andSnGe1Ge}
                  onChange={this.changeSliderValue}
                  unit="DAYS"
                />
                <WeatherRangeInput
                  id="andSnGe1Le"
                  label="AT MOST"
                  min={inputMinMax["andSnGe1Le"][0]}
                  max={inputMinMax["andSnGe1Le"][1]}
                  value={this.state.andSnGe1Le}
                  onChange={this.changeSliderValue}
                  unit="DAYS"
                />
              </fieldset>
              <fieldset>
                <legend>
                  The average number of days with an inch or more of snow on the ground is:
                </legend>
                <WeatherRangeInput
                  id="andSnCGe1Ge"
                  label="AT LEAST"
                  min={inputMinMax["andSnCGe1Ge"][0]}
                  max={inputMinMax["andSnCGe1Ge"][1]}
                  value={this.state.andSnCGe1Ge}
                  onChange={this.changeSliderValue}
                  unit="DAYS"
                />
                <WeatherRangeInput
                  id="andSnCGe1Le"
                  label="AT MOST"
                  min={inputMinMax["andSnCGe1Le"][0]}
                  max={inputMinMax["andSnCGe1Le"][1]}
                  value={this.state.andSnCGe1Le}
                  onChange={this.changeSliderValue}
                  unit="DAYS"
                />
              </fieldset>
              <fieldset>
                <legend>
                  The average number of rainy days (at least 1/2 inch precipitation) is:
                </legend>
                <WeatherRangeInput
                  id="andPrGe5TiGe"
                  label="AT LEAST"
                  min={inputMinMax["andPrGe5TiGe"][0]}
                  max={inputMinMax["andPrGe5TiGe"][1]}
                  value={this.state.andPrGe5TiGe}
                  onChange={this.changeSliderValue}
                  unit="DAYS"
                />
                <WeatherRangeInput
                  id="andPrGe5TiLe"
                  label="AT MOST"
                  min={inputMinMax["andPrGe5TiLe"][0]}
                  max={inputMinMax["andPrGe5TiLe"][1]}
                  value={this.state.andPrGe5TiLe}
                  onChange={this.changeSliderValue}
                  unit="DAYS"
                />
              </fieldset>
            </section>
            <button className="search-button" type="submit">FIND MATCHES</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
