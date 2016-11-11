import React, { Component } from 'react';
import './cityresults.css';
import CityList from './citylist.js';


class CityResults extends Component {
  constructor() {
    super();
    this.citiesList = this.citiesList.bind(this);
  }

  // Remove duplicate city names from matches and then return matches for display
  citiesList() {
    let previousValue = "";

    return this.props.matches.filter(function(obj) {
      let cityValue = obj[Object.keys(obj)]["location"]["city"];
      let stateValue = obj[Object.keys(obj)]["location"]["state"];
      if ((cityValue + stateValue) !== previousValue) {
        previousValue = cityValue + stateValue;
        return true;
      } else {
        return false;
      }
    }).map(obj => (
      <CityList
        city={obj[Object.keys(obj)]["location"]["city"]}
        state={obj[Object.keys(obj)]["location"]["state"]}
        sharedarea={obj[Object.keys(obj)]["location"]["sharedarea"]}
        station={obj[Object.keys(obj)]}
      />
    ));
  }


  render() {
    return (
      <div className="CityResults">
        {(this.props.matches.length > 0) ? (
          <div className="wrapper">
            <h2>Results</h2>
            <ul>
              {this.citiesList()}
            </ul>
          </div>
        ) : null}
        {(this.props.clicked && this.props.matches.length === 0) ? (
          <div className="wrapper">
            <p>Sorry, there were no matches.  Please alter you search and try again.</p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default CityResults;
