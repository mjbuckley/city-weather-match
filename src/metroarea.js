import React from 'react';
import { Link } from 'react-router';
import buildLink from './buildlink.js';

// LINKS RIGHT NOW ARE PLACEHOLDERS, NOT WORKING
// An initial working pass at a metro areas page, but much to still do.  Issues:
// -Currently does not distinguish between areas with same name (Columbus OH vs GA, etc.).
// -Need to add links to the cities.
// -Assumes cities isn't empty. I don't think it could be, but make sure.
// -What about handling jibberish input ex: /metro-areas/fakename?
// -Should some of the checking be precomputed and put into weather.json?

const stationsObj = require('./data/weather.json');
const metroMap = require('./data/metromap.json');

function MetroArea(props) {

  const metroArea = decodeURIComponent(props.params.metroarea);

  // // Find cities that are in the metro area
  // let cities = [];
  // Object.keys(stationsObj).forEach(function(station) {
  //   let areas = stationsObj[station]["area"];
  //
  //   if (areas.includes(metroArea)) {
  //     cities.push(stationsObj[station]["city"]);
  //   }
  // });
  //
  // let previous = "";
  // let filteredCities = cities.filter(function(city) {
  //   if (city === previous) {
  //     return false;
  //   } else {
  //     previous = city;
  //     return true;
  //   }
  // });
  const cities = Object.keys(metroMap[metroArea]);

  return (
    <div>
      <h2>{metroArea} Urban Area</h2>
      <ul>
        {cities.map(function(city, index) {
          // this works, but ultimately be smarter about which station I link to, not just the first one.
          const station = metroMap[metroArea][city][0];
          const state = stationsObj[station]["state"];
          const path ="/location/" + city + "/" + state + "/" + station;
          return (<li key={index}><Link to={buildLink(props, path)}>{city}</Link></li>);
        })}
      </ul>
    </div>
  );
}

export default MetroArea;
