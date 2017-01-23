import React, { Component } from 'react';
import { Link } from 'react-router'


class CityList extends Component {

  render() {

    const city = this.props.stationsObj[this.props.station]["city"];
    const state = this.props.stationsObj[this.props.station]["state"];
    const station = this.props.station;

    // Link to station info if only one station for city. Link to disambiguation page if There
    // is more than one station in the city.
    let link = "/location/" + city + "/" + state;

    if (this.props.stationsObj[this.props.station]["multiCity"].length < 2) {
      link = link + "/" + station;
    }

    return (
      <li key={station} className="CityList">
        <Link to={link}>{city}, {state}</Link>
      </li>
    );
  }
}

export default CityList;
