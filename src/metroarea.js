import React from 'react';
import { Link } from 'react-router';
import findCityLink from './findcitylink.js';
import buildLink from './buildlink.js';

const stationsObj = require('./data/weather.json');
const metroMap = require('./data/metromap.json'); // Mapping of metro areas to cities to stations

function MetroArea(props) {

  // Metro area name in URL
  const metroArea = decodeURIComponent(props.params.metroarea);

  // Verify that metroArea param is an actual metro area (metroMap[metroArea] will be undefined if metro area invalid)
  if (metroMap[metroArea]) {

    // Array of every city in metroArea
    const cities = Object.keys(metroMap[metroArea]);

    return (
      <div>
        <h2>{metroArea} Urban Area</h2>
        <ul>
          {cities.map(function(city, index) {

            // Get station number of station to link to.
            const linkStation = findCityLink(city, metroArea, props.matches);

            // Build link info
            const state = stationsObj[linkStation]["state"];
            const path ="/location/" + encodeURIComponent(city) + "/" + state + "/" + encodeURIComponent(linkStation);

            // Return li/link
            return (<li key={index}><Link to={buildLink(props, path)}>{city}</Link></li>);
          })}
        </ul>
      </div>
    );

  // Metro area name in url is invalid. Return error message.
  } else {

    return (
      <div>
        <p>There are no weather stations for the metro area that you entered in the URL.</p>
      </div>
    );
  }
}

export default MetroArea;






// 3/27: playing around with way to extract stuff. NOTE the single quote above. Remove when done with this.

// LOOK INTO SYNTAX HIGHLIGHTING FOR REACT, ESP FOR JSX

// Takes an array of station(s) in a city. Returns the first station that is in matches. If no station is
// in matches then it returns the first station in the array.
function findCityLinks(metroArea, matches) {

  // Mapping of metro areas to cities to stations: {metroArea: {city: [station1, station2], city2: [station]}}
  const metroMap = require('./data/metromap.json');

  // Array of all cities in metroArea
  const cities = Object.keys(metroMap[metroArea]);

  // Array to add station ids to link to (there will be one for each city in metroArea)
  let links = [];

  cities.forEach(function(city) {

    // Creates an array with all stations in city that are in matches.
    const stationMatchesInCity = metroMap[metroArea][city].filter(function(station) {
      return matches.includes(station);
    });

    // Add first matching station to links array. If no matching stations, then add the first station
    // in city's stations array.
    if (stationMatchesInCity.length > 0) {
      links.push(stationMatchesInCity[0]);
    } else {
      links.push(metroMap[metroArea][city][0]);
    }
  });

  // Return array of station ids, one for each city in metroArea
  return links;

}

export default findCityLinks;

// DEAL WITH DIFFERENT SYTLING DEPENDING ON MATCH/NO MATCH

// Array of stations id, one for each city.
const cityLinks = findCityLinks(metroArea, props.matches);

const cityLinksList = cityLinks.map(function(station) {
  return buildCityLink(station, props);
});


return (
  <div>
    <h2>{metroArea} Urban Area</h2>
    <ul>
      {cityLinksList}
    </ul>
  </div>
);

// metroMap[metroArea] = {city1: [station1, station2], city2: [station1], etc.}
// Object.keys(metroMap[metroArea]) = [city1, city2, etc.]


// Given a station id, retrun an li element that 1) links to the station's page (with correct query params
// if needed), 2) lists the station's city name as the link text, and 3) include a className indictating
// if the station is in props.matches or not (not is !isActive).
function buildCityLink(station, props) {

  const city = stationsObj[station]["city"];
  const state = stationsObj[station]["state"];
  const path ="/location/" + encodeURIComponent(city) + "/" + encodeURIComponent(state) + "/" + encodeURIComponent(station);

  return (
    <li key={station} className{(props.isActive && props.matches.includes(station) ? "match" : "no-match")}>
      <Link to={buildLink(props, path)}>{city}</Link>
    </li>
  );
}

export default buildCityLink;




className{(props.isActive && props.matches.includes(station) ? "match" : "no-match")}
