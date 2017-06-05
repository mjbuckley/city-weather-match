import React from 'react';
import { Link } from 'react-router'
import buildLink from '../utils/buildlink.js';
import SharedAreaList from '../components/sharedarealist.js';
import Graph from '../components/graph.js';
import '../css/location.css';

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
  const highTemp = stationsObj[station]["mTmxAv"].slice(0, 12); // Arr of avg monthly high temp values
  const lowTemp = stationsObj[station]["mTmnAv"].slice(0, 12); // Arr of avg monthly low temp values
  const path = "/location/" + encodeURIComponent(city) + "/" + encodeURIComponent(state);


  return (
    <div className="location-wrapper">
      <div className="location">
        <h3>{city}, {state}</h3>
        <ul>
          <li>Average high temp during the hottest month of the year: {hmTmxAv}</li>
          <li>Averag low temp during the coldest month of the year: {lmTmnAv}</li>
          <li>Average number of days with an inch or more of snowfall: {andSnGe1}</li>
          <li>Average number of days with an inch or more snow on the ground: {andSnCGe1}</li>
          <li>Average number of rainy days: {andPrGe5Ti}</li>
          <li>Average number of days where the temp drops below freezing: {andTmnLe32}</li>
          <li>Average number of days where the temp gets above 60 °F: {andTmxGe60}</li>
          <li>Aaverage number of days where the temp gets above 80 °F: {andTmxGe80}</li>
        </ul>

        { (multiCity.length > 1) ? (
          <p>There are multiple weather stations in {city}. <Link to={buildLink(props, path)}>Click to view</Link> info on all stations.</p>
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

        <Graph highTemp={highTemp} lowTemp={lowTemp} />
      </div>
    </div>
  );
}

export default Location;
