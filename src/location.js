import React from 'react';
import SharedAreaList from './sharedarealist.js';

function Location(props) {
  const station = props.params.station;
  const stationsObj = props.stationsObj;

  const city = stationsObj[station]["city"];
  const sharedarea = stationsObj[station]["sharedarea"];
  const state = stationsObj[station]["state"];

  const maxTemp = stationsObj[station]["mlyTMaxAvg"][12];
  const lowTemp = stationsObj[station]["mlyTMinAvg"][12];
  const snowfall = stationsObj[station]["annGndInchPlus"];
  const precip = stationsObj[station]["annprcpge050hi"];
  const below32 = stationsObj[station]["daysBelow32"];


  return (
    <div>
      <h3>{city}, {state}</h3>
      <ul>
        <li>The average high temp during the hottest month: {maxTemp}</li>
        <li>The averag low temp during the coldest month: {lowTemp}</li>
        <li>The average number of days with at least an inch of snowfall: {snowfall}</li>
        <li>The average number of rainy days: {precip}</li>
        <li>The average number of days where the temp drops below freezing: {below32}</li>
      </ul>

      {(sharedarea.length > 0) ? (
        <SharedAreaList sharedarea={sharedarea} city={city} state={state}/>
      ) : null}

    </div>
  );
}

export default Location;
