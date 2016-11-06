import React, { Component } from 'react';
import './cityresults.css';
import CityList from './citylist.js';


class CityResults extends Component {
  constructor() {
    super();
    this.citiesList = this.citiesList.bind(this);
  }

  citiesList() {
    return this.props.matches.map(obj => (
      <CityList
        city={obj[Object.keys(obj)]["location"]["city"]}
        state={obj[Object.keys(obj)]["location"]["state"]}
        sharedarea={obj[Object.keys(obj)]["location"]["sharedarea"]}
      />
    ));
  };

  render() {
    return (
      <div className="CityResults">
        {(this.props.matches.length > 0) ? (
          <div className="wrapper">
            <h2>Results</h2>
            {this.citiesList()}
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
