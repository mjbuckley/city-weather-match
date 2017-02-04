import React, { Component } from 'react';
import checkParams from './checkparams.js';
import './css/results.css';
import CityList from './citylist.js';

const stationsObj = require('./data/weather.json');

class Results extends Component {
  constructor() {
    super();
    this.citiesList = this.citiesList.bind(this);
  }

  // Check that query param values match values in state. If yes, matches in state are used.
  // If not, matches are computed and state is updated.
  componentWillMount() {
    checkParams(this.props);
  }

  // React Router does not treat a change in query params as a new mounting of the component, so
  // doing something like navigating to a bookmarked results page from a current results page would
  // not change the results. This looks for prop changes and makes state changes as needed.
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.maxTemp !== this.props.location.query.maxTemp ||
        nextProps.location.query.lowTemp !== this.props.location.query.lowTemp ||
        nextProps.location.query.below32 !== this.props.location.query.below32 ||
        nextProps.location.query.snow !== this.props.location.query.snow ||
        nextProps.location.query.precip !== this.props.location.query.precip
    ) {
      checkParams(nextProps);
    }
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
