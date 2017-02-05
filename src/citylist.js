import React, { Component } from 'react';
import { Link } from 'react-router'
import buildLink from './buildlink.js';

const stationsObj = require('./data/weather.json');

class CityList extends Component {

  render() {
    const station = this.props.station;
    const city = stationsObj[station]["city"];
    const state = stationsObj[station]["state"];

    // Link to station page. The station page will note if there is more than
    // one station in that city. State not URI encoded because it is a 2 letter abbreviation.
    const path = "/location/" + encodeURIComponent(city) + "/" + state + "/" + station;


    return (
      <li className="CityList">
        <Link to={buildLink(this.props, path)}>{city}, {state}</Link>
      </li>
    );
  }
}

export default CityList;
