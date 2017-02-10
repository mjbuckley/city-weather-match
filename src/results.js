import React, { Component } from 'react';
import { Link } from 'react-router';
import checkParams from './checkparams.js';
import checkParamsChange from './checkparamschange.js';
import buildLink from './buildlink.js';
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

  // Filter matches in order to only link to one station per city. This function remove stations from the matches
  // if there is already another station from that city pressent. I could have listed cities multiple times or
  // linked to the city disambiguation page, but this seemed like in could be confusing to users. Instead, I link to
  // the first (matching) station in each city. On the linked to station page itself I will note if there a multiple
  // station matches for that city, and if yes, will link there. So, all data might not be shown upfront, but it will
  // still be available.
  citiesList() {
    let previousValue = "";

    return this.props.matches.filter(function(station) {
      let city = stationsObj[station]["city"];
      let state = stationsObj[station]["state"];

      if ((city + state) !== previousValue) {
        previousValue = city + state;
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
        clicked={this.props.clicked}
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
          <p>
          Sorry, there were no matches.  Please <Link to={buildLink(this.props, "/search")}>try again</Link> with new search values.
          </p>
        </div>
        )}

      </div>
    );
  }
}

export default Results;
