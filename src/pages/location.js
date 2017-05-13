import React from 'react';
import { Link } from 'react-router'
import buildLink from '../utils/buildlink.js';
import SharedAreaList from '../components/sharedarealist.js';

const stationsObj = require('../data/weather.json');

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


  // Keep in mind that the weather values below are values for the station, not search values.
  const multiCity = stationsObj[station]["multiCity"];
  const sharedarea = stationsObj[station]["sharedarea"];
  const hmTmxAv = stationsObj[station]["mTmxAv"][12];
  const lmTmnAv = stationsObj[station]["mTmnAv"][12];
  const andSnGe1 = stationsObj[station]["andSnGe1"];
  const andSnCGe1 = stationsObj[station]["andSnCGe1"];
  const andPrGe5Ti = stationsObj[station]["andPrGe5Ti"];
  const andTmnLe32 = stationsObj[station]["andTmnLe32"];
  const andTmxGe60 = stationsObj[station]["andTmxGe60"];
  const andTmxGe80 = stationsObj[station]["andTmxGe80"];
  const path = "/location/" + encodeURIComponent(city) + "/" + encodeURIComponent(state);


  return (
    <div>
      <h3>{city}, {state}</h3>
      <ul>
        <li>The average high temp during the hottest month: {hmTmxAv}</li>
        <li>The averag low temp during the coldest month: {lmTmnAv}</li>
        <li>The average number of days with at least an inch of snowfall: {andSnGe1}</li>
        <li>The average number of days with at least an inch of snow on the ground: {andSnCGe1}</li>
        <li>The average number of rainy days: {andPrGe5Ti}</li>
        <li>The average number of days where the temp drops below freezing: {andTmnLe32}</li>
        <li>The average number of days where the temp gets above 60: {andTmxGe60}</li>
        <li>The average number of days where the temp gets above 80: {andTmxGe80}</li>
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
          weatherValues={props.weatherValues}
          isActive={props.isActive}
        />
      ) : null}
    </div>
  );
}

export default Location;
