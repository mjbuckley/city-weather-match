import React, { Component } from 'react';
import { Link } from 'react-router'

const stationsObj = require('./data/weather.json');

class CityList extends Component {

  render() {

    const station = this.props.station;
    const city = stationsObj[station]["city"];
    const state = stationsObj[station]["state"];

    // Link to station info if only one station for city. Link to disambiguation page if There
    // is more than one station in the city.
    let link = "/location/" + city + "/" + state;

    if (stationsObj[station]["multiCity"].length < 2) {
      link = link + "/" + station;
    }

    return (
      <li className="CityList">
        <Link to={link}>{city}, {state}</Link>
      </li>
    );
  }
}

export default CityList;
