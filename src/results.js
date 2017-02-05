import React, { Component } from 'react';
import checkParams from './checkparams.js';
import checkParamsChange from './checkparamschange.js';
import './css/results.css';
import CityList from './citylist.js';

const stationsObj = require('./data/weather.json');

class Results extends Component {
  constructor() {
    super();
    this.citiesList = this.citiesList.bind(this);
  }

  // Check query param values against values in state and update if needed.
  componentWillMount() {
    checkParams(this.props);
  }

  // Watch for query param changes and update state as needed.
  componentWillReceiveProps(nextProps) {
    checkParamsChange(nextProps, this.props);
  }

  // Remove duplicate city names from matches and then return matches for display
  citiesList() {
    let previousValue = "";

    return this.props.matches.filter(function(station) {
      let cityValue = stationsObj[station]["city"];
      let stateValue = stationsObj[station]["state"];

      if ((cityValue + stateValue) !== previousValue) {
        previousValue = cityValue + stateValue;
        return true;
      } else {
        return false;
      }
    }).map(station => (
      <CityList
        key={station}
        station={station}
        maxTemp={this.props.maxTemp}
        lowTemp={this.props.lowTemp}
        snowfall={this.props.snowfall}
        precip={this.props.precip}
        below32={this.props.below32}
      />
    ));
    }

  render() {
    return (
      <div className="CityResults">
        <h2>Results</h2>
        {(this.props.matches.length > 0) ? (
        <div className="wrapper">
          <ul>
            {this.citiesList()}
          </ul>
        </div>
        ) : (
        <div className="wrapper">
          <p>Sorry, there were no matches.  Please alter you search and try again.</p>
        </div>
        )}

      </div>
    );
  }
}

export default Results;
