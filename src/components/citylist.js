import React from 'react';
import { Link } from 'react-router';
import buildLink from '../utils/buildlink.js';
import stationsObj from '../data/weather.json';

function CityList(props) {

  const station = props.station;
  const city = stationsObj[station]["c"];
  const state = stationsObj[station]["s"];

  const path = "/location/" + encodeURIComponent(city) + "/" + encodeURIComponent(state) + "/" + encodeURIComponent(station);

  return (
    <li className="CityList">
      <Link to={buildLink(props, path)}>{city}, {state}</Link>
    </li>
  );
}

export default CityList;
