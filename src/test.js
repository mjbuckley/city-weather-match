import React from 'react';
import { Link } from 'react-router';
import metroStationLinks from './metrostationlinks.js';
import CityStationLink from './citystationlink.js';
// Mapping of metro areas to cities to stations: {metroArea: {city: [station1, station2], city2: [station]}, etc.}
const metroMap = require('./data/metromap.json');

function MetroArea(props) {

  // Metro area name in URL
  const metroArea = decodeURIComponent(props.params.metroarea);

  // Verify that metroArea is an actual metro area. If metroMap[metroArea] is undefined, return an
  // error message.
  if (metroMap[metroArea] === undefined) {
    return (
      <div>
        <p>There are no weather stations for the metro area that you entered in the URL.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>{metroArea} Urban Area</h2>
      <ul>
        {metroStationLinks(metroArea, props).map((station) =>
          <CityStationLink {...props} station={station} key={station} />
        )}
      </ul>
    </div>
  );
}

export default MetroArea;
