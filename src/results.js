import React, { Component } from 'react';
import './results.css';
import CityList from './citylist.js';


class Results extends Component {
  constructor() {
    super();
    this.citiesList = this.citiesList.bind(this);
  }

  // Remove duplicate city names from matches and then return matches for display
  citiesList() {
    let previousValue = "";
    const stationsObj = this.props.stationsObj;

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
        stationsObj={stationsObj}
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
