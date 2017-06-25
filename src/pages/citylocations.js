import React from 'react';
import StationLink from '../components/stationlink.js';
import '../css/citylocation.css';

const stationsObj = require('../data/weather.json');

function CityLocations(props) {

  const city = decodeURIComponent(props.params.city);
  const state = decodeURIComponent(props.params.state);

  // Find all stations in city. Also works to verify tht city/state params are valid because invalid
  // name(s) won't turn up any locations.
  let locations = [];

  Object.keys(stationsObj).forEach(function(station) {
    if ( (stationsObj[station]["city"] === city) &&
    (stationsObj[station]["state"] === state) ) {
      locations.push(station);
    }
  });


  if (locations.length === 0) {
    return (
      <div className="citylocation-wrapper">
        <div className="citylocation">
          <p>Sorry, the name you entered is not in the database</p>
        </div>
      </div>
    );
  }

  return (
    <div className="citylocation-wrapper">
      <div className="citylocation">
        <h2>{city}, {state}</h2>

        {(locations.length > 1) ? (
          <p>There are {locations.length} NOAA weather stations in {city}. Click on one of the stations listed below to view more detailed weather information for that location.</p>
        ) : null}

        <ul>
          {locations.map((station) =>
            <StationLink {...props} station={station} city={city} state={state} key={station}/>
          )}
        </ul>
      </div>
    </div>
  );
}

export default CityLocations;
