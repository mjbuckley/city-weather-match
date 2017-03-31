import React from 'react';
import { Link } from 'react-router';
import buildLink from './buildlink.js';

const stationsObj = require('./data/weather.json');

function CityList(props) {

  const station = props.station;
  const city = stationsObj[station]["city"];
  const state = stationsObj[station]["state"];

  const path = "/location/" + encodeURIComponent(city) + "/" + encodeURIComponent(state) + "/" + encodeURIComponent(station);

  return (
    <li className="CityList">
      <Link to={buildLink(props, path)}>{city}, {state}</Link>
    </li>
  );
}

export default CityList;
