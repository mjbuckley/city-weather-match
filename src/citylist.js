import React, { Component } from 'react';
import { Link } from 'react-router'

const stationsObj = require('./data/weather.json');

class CityList extends Component {

  render() {
    const station = this.props.station;
    const city = stationsObj[station]["city"];
    const state = stationsObj[station]["state"];

    // Link to station page. The station page will note if there is more than
    // one station in that city.
    const link = "/location/" + city + "/" + state + "/" + station;

    return (
      <li className="CityList">
        <Link to={link}>{city}, {state}</Link>
      </li>
    );
  }
}

export default CityList;
