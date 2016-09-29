import React, { Component } from 'react';
import './cityresults.css';

class CityResults extends Component {
  constructor() {
    super();
    this.cityList = this.cityList.bind(this);
  }

  cityList() {
    return this.props.matches.map(obj => (
      <li key={Object.keys(obj)}>
        {obj[Object.keys(obj)]["location"]["city"]}
      </li>
    ));
  };

  render() {
    return (
      <div className="CityResults">
        {(this.props.matches.length > 0) ? (
          <div className="wrapper">
            <h2>Results</h2>
            {this.cityList()}
          </div>
        ) : null}
      </div>
    );
  }
}

export default CityResults;
