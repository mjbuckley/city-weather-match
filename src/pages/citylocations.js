import React from 'react';
import StationLink from '../components/stationlink.js';
import '../css/citylocation.css';
import {Helmet} from "react-helmet";

const stationsObj = require('../data/weather.json');

function CityLocations(props) {

  const city = decodeURIComponent(props.params.city);
  const state = decodeURIComponent(props.params.state);
  const description = "A listing of all NOAA weather stations in " + city + ", " + state;

  // Find all stations in city. Also works to verify that city/state params are valid because invalid
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
      <div className="citylocation">

        <Helmet>
          <title>Error | No Stations Found | City Weather Match</title>
          <meta name="description" content="Error page. No NOAA stations are located at this location." />
          <meta name="robots" content="noindex" />
        </Helmet>

        <p>Sorry, the name that you entered is not in the data set.</p>
      </div>
    );
  }

  return (
    <div className="citylocation">

      <Helmet>
        <title>{city}, {state} Weather Stations | City Weather Match</title>
        <meta name="description" content={description} />
      </Helmet>


      <h2>{city}, {state}</h2>

      {(locations.length > 1) ? (
        <p>There are {locations.length} NOAA weather stations in {city}. Click on one of the stations listed below to view more detailed weather information for that location.</p>
      ) : (
        <p>There is one NOAA weather stations in {city}. Click on the station listed below to view more detailed weather information for that location.</p>
      )}

      <ul>
        {locations.map((station) =>
          <StationLink {...props} station={station} city={city} state={state} key={station}/>
        )}
      </ul>
    </div>
  );
}

export default CityLocations;
