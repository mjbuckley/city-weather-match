import React from 'react';
import { Link } from 'react-router'

// LINKS RIGHT NOW ARE PLACEHOLDERS, NOT WORKING
// An initial working pass at a metro areas page, but much to still do.  Issues:
// -Currently does not distinguish between areas with same name (Columbus OH vs GA, etc.).
// -Lists city names multiple times if multiple entries exist.
// -Need to add links to the cities.
// -Not sure if things are alphbatized or not.
// -Assumes cities isn't empty. I don't think it could be, but make sure.
// -What about handling jibberish input ex: /metro-areas/fakename?
// -Should some of the checking be precomputed and put into weather.json?
function MetroArea(props) {

  const metroArea = props.params.metroarea;
  let cities = [];

  Object.keys(props.stationsObj).forEach(function(station) {
    let areas = props.stationsObj[station]["area"];

    if (areas.includes(metroArea)) {
      cities.push(props.stationsObj[station]["city"]);
    }
  });

  return (
    <div>
      <h2>{metroArea} Urban Area</h2>
      <ul>
        {cities.map(function(city, index) {
          return (<li key={index}><Link to="/fake">{city}</Link></li>);
        })}
      </ul>
    </div>
  );
}

export default MetroArea;
