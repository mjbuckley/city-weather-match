import React from 'react';
import { Link } from 'react-router'
import buildLink from './buildlink.js';
import SharedAreaList from './sharedarealist.js';

const stationsObj = require('./data/weather.json');

// Decide how to handle this page getting hit directly without props. I makes sense that that is ok,
// since people might just want to look at station info outside the context of a search, but need to be able
// to handle things like sharedArea without prop values.
function Location(props) {

  // Keep in mind that the weather values below are not search values but values for the station.
  const station = decodeURIComponent(props.params.station);
  const city = stationsObj[station]["city"];
  const multiCity = stationsObj[station]["multiCity"];
  const sharedarea = stationsObj[station]["sharedarea"];
  const state = stationsObj[station]["state"];
  const mTmxAv = stationsObj[station]["mTmxAv"][12];
  const mTmnAv = stationsObj[station]["mTmnAv"][12];
  const andSnGe1 = stationsObj[station]["andSnGe1"];
  const andPrGe5Ti = stationsObj[station]["andPrGe5Ti"];
  const andTmnLe32 = stationsObj[station]["andTmnLe32"];
  const path = "/location/" + encodeURIComponent(city) + "/" + state;

  return (
    <div>
      <h3>{city}, {state}</h3>
      <ul>
        <li>The average high temp during the hottest month: {mTmxAv}</li>
        <li>The averag low temp during the coldest month: {mTmnAv}</li>
        <li>The average number of days with at least an inch of snowfall: {andSnGe1}</li>
        <li>The average number of rainy days: {andPrGe5Ti}</li>
        <li>The average number of days where the temp drops below freezing: {andTmnLe32}</li>
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
          mTmxAv={props.mTmxAv}
          mTmnAv={props.mTmnAv}
          andSnGe1={props.andSnGe1}
          andPrGe5Ti={props.andPrGe5Ti}
          andTmnLe32={props.andTmnLe32}
          clicked={props.clicked}
        />
      ) : null}

    </div>
  );
}

export default Location;
