import React, { Component } from 'react';
import { hashHistory } from 'react-router'
import WeatherRangeInput from '../components/weatherrangeinput.js';
import '../css/search.css';
import {Helmet} from "react-helmet";

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

  // Helmet conditionally rendered because Search is sometimes route entry point and sometimes a child
  // of Home (child's Helmet component overrides parent, which would be wrong in this case).
  // props.location only exists (true) when Search is the route entry point.
  render() {
    return (
      <div className="search-wrapper">

      {(this.props.location) ? (
        <Helmet>
          <title>Find Cities By Weather | City Weather Match | Search Page</title>
          <meta name="description" content="Enter your weather preferrences into the search form to search through thousands of locations and find the cities that match your weather preferrencs." />
        </Helmet>
      ) : null}


        <div className="search">
          <h2 className="search-heading">Search</h2>
          <p>Select your range of acceptable weather values for each question in the form below. Then click the "Find Matches" button to see the cities that match your requirements.</p>
          <form onSubmit={this.fetchData}>
            <section className="search-heat">
              <h3>Heat</h3>
              <fieldset>
                <legend>
                  Number of days where the temperature gets to 60 °F or above:
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
                Number of days where the temperature gets to 80 °F or above:
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
                  Average high temperature durring the hottest month of the year:
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
              <h3>Cold</h3>
              <fieldset>
                <legend>
                  Average low temperature durring the coldest month of the year:
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
                  Number of days where the temperature drops below freezing is:
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
              <h3>Precipitation</h3>
              <fieldset>
                <legend>
                  Number of days with an inch or more snowfall:
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
                  Number of days with an inch or more snow on the ground:
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
                  Number of rainy days (at least 1/2 inch precipitation):
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
