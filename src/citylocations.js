import React from 'react';
import { Link } from 'react-router'
import buildLink from './buildlink.js';

const stationsObj = require('./data/weather.json');

function CityLocations(props) {

  const city = decodeURIComponent(props.params.city);
  const state = props.params.state;

  // Find all stations in city. Works fine, but would a precomputed json file be better?
  let locations = [];
  Object.keys(stationsObj).forEach(function(station) {
    if ( (stationsObj[station]["city"] === city) &&
    (stationsObj[station]["state"] === state) ) {
      locations.push(station);
    }
  });

  return (
    <div>
      <h2>{city}, {state}</h2>

      {(locations.length > 1) ? (
        <p>There are several weather stations in {city}:</p>
      ) : null}

      <ul>
        {locations.map(function(station) {
          const path = "/location/" + encodeURIComponent(city) + "/" + state + "/" + station;
          return (<li key={station}><Link to={buildLink(props, path)}>Station {station}</Link></li>);
        })}
      </ul>
    </div>
  );
}

export default CityLocations;
