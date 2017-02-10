import React from 'react';
import { Link } from 'react-router'
import buildLink from './buildlink.js';
import SharedAreaList from './sharedarealist.js';

const stationsObj = require('./data/weather.json');

// Decide how to handle this page getting hit directly without props. I makes sense that that is ok,
// since people might just want to look at station info outside the context of a search, but need to be able
// to handle things like sharedArea without prop values.
function Location(props) {

  // Keep in mind that below weather values below are not search values be values for the station.
  const station = decodeURIComponent(props.params.station);
  const city = stationsObj[station]["city"];
  const multiCity = stationsObj[station]["multiCity"];
  const sharedarea = stationsObj[station]["sharedarea"];
  const state = stationsObj[station]["state"];
  const maxTemp = stationsObj[station]["mlyTMaxAvg"][12];
  const lowTemp = stationsObj[station]["mlyTMinAvg"][12];
  const snowfall = stationsObj[station]["annGndInchPlus"];
  const precip = stationsObj[station]["annprcpge050hi"];
  const below32 = stationsObj[station]["daysBelow32"];
  const path = "/location/" + encodeURIComponent(city) + "/" + state;

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

      { (multiCity.length > 1) ? (
        <p>There are multiple weather stations in {city}.
        <Link to={buildLink(props, path)}>Click to view</Link> info on all stations.</p>
      ) : null}

      {(sharedarea.length > 0) ? (
        <SharedAreaList
          sharedarea={sharedarea}
          city={city}
          state={state}
          maxTemp={props.maxTemp}
          lowTemp={props.lowTemp}
          snowfall={props.snowfall}
          precip={props.precip}
          below32={props.below32}
          clicked={props.clicked}
        />
      ) : null}

    </div>
  );
}

export default Location;
