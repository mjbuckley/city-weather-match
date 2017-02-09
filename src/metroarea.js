import React from 'react';
import { Link } from 'react-router';
import buildLink from './buildlink.js';

const stationsObj = require('./data/weather.json');
const metroMap = require('./data/metromap.json');

function MetroArea(props) {

  const metroArea = decodeURIComponent(props.params.metroarea);
  const cities = Object.keys(metroMap[metroArea]);

  // The map function below should probably be cleaned up, but it works. Here's what's happening:
  // -cities is an array of all city names in the metro area.
  // -metroMap[metroArea][city] is an array of all stations in city.
  // -The map function loops through each city in cities and looks to find the first station for each city
  // that is part of props.matches. The first one found is returned as a link to that station.
  // -If no match is found, then the link is to the first station in the stations array.
  // -Note: includes() returns T/F. find() returns the first value it hits that satisfies the test function,
  // and it returns undefined if nothing satisfies the function).
  return (
    <div>
      <h2>{metroArea} Urban Area</h2>
      <ul>
        {cities.map(function(city, index) {

          let linkStation = cities.find(function(index) {
            return props.matches.includes(metroMap[metroArea][city][index])
          });

          if (linkStation === undefined) {
            linkStation = metroMap[metroArea][city][0];
          }

          const state = stationsObj[linkStation]["state"];
          const path ="/location/" + city + "/" + state + "/" + linkStation;
          return (<li key={index}><Link to={buildLink(props, path)}>{city}</Link></li>);
        })}
      </ul>
    </div>
  );
}

export default MetroArea;
