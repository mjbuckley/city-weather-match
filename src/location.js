import React from 'react';
import { Link } from 'react-router'
import buildLink from './buildlink.js';
import SharedAreaList from './sharedarealist.js';

const stationsObj = require('./data/weather.json');

function Location(props) {

  const station = decodeURIComponent(props.params.station);
  const city = decodeURIComponent(props.params.city);
  const state = decodeURIComponent(props.params.state);

  // Make sure station is url is real. If not, return error message.
  if (stationsObj[station] === undefined) {
    return (
      <div>
        <p>The station ID that you entered in the URL does not exist.</p>
      </div>
    );
  }

  // Make sure city and state in url match the station in the url. If not, return error message.
  if (city !== stationsObj[station]["city"] || state !== stationsObj[station]["state"]) {
    return (
      <div>
        <p>The city and/or state that you entered in the URL do not match the station ID.</p>
      </div>
    );
  }


  // Keep in mind that the weather values below are not search values but values for the station.
  const multiCity = stationsObj[station]["multiCity"];
  const sharedarea = stationsObj[station]["sharedarea"];
  const mTmxAv = stationsObj[station]["mTmxAv"][12];
  const mTmnAv = stationsObj[station]["mTmnAv"][12];
  const andSnGe1 = stationsObj[station]["andSnGe1"];
  const andPrGe5Ti = stationsObj[station]["andPrGe5Ti"];
  const andTmnLe32 = stationsObj[station]["andTmnLe32"];
  const path = "/location/" + encodeURIComponent(city) + "/" + encodeURIComponent(state);


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
          isActive={props.isActive}
        />
      ) : null}
    </div>
  );
}

export default Location;
