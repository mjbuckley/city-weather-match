import React, { Component } from 'react';
import { Link } from 'react-router'


class CityList extends Component {

  render() {

    const city = this.props.stationsObj[this.props.station]["city"];
    const state = this.props.stationsObj[this.props.station]["state"];
    const station = this.props.station;
    // Eventually make link different based on single or multiple locations for city
    const link = "/location/" + city + "/" + state + "/" + station;

    return (
      <li key={station} className="CityList">
        <Link to={link}>{city}, {state}</Link>
      </li>
    );
  }
}

export default CityList;
