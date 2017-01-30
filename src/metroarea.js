import React from 'react';
import { Link } from 'react-router'

// LINKS RIGHT NOW ARE PLACEHOLDERS, NOT WORKING
// An initial working pass at a metro areas page, but much to still do.  Issues:
// -Currently does not distinguish between areas with same name (Columbus OH vs GA, etc.).
// -Need to add links to the cities.
// -Assumes cities isn't empty. I don't think it could be, but make sure.
// -What about handling jibberish input ex: /metro-areas/fakename?
// -Should some of the checking be precomputed and put into weather.json?

const stationsObj = require('./data/weather.json');

function MetroArea(props) {

  const metroArea = props.params.metroarea;

  // Find cities that are in the metro area
  let cities = [];
  Object.keys(stationsObj).forEach(function(station) {
    let areas = stationsObj[station]["area"];

    if (areas.includes(metroArea)) {
      cities.push(stationsObj[station]["city"]);
    }
  });

  let previous = "";
  let filteredCities = cities.filter(function(city) {
    if (city === previous) {
      return false;
    } else {
      previous = city;
      return true;
    }
  });

  return (
    <div>
      <h2>{metroArea} Urban Area</h2>
      <ul>
        {filteredCities.map(function(city, index) {
          return (<li key={index}><Link to="/fake">{city}</Link></li>);
        })}
      </ul>
    </div>
  );
}

export default MetroArea;
