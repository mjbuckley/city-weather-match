import React from 'react';
import metroStationLinks from '../utils/metrostationlinks.js';
import CityStationLink from '../components/citystationlink.js';
import '../css/metroarea.css';


// Mapping of metro areas to cities to stations: {metroArea: {city: [station1, station2], city2: [station]}, etc.}
const metroMap = require('../data/metromap.json');

function MetroArea(props) {

  // Metro area name in URL
  const metroArea = decodeURIComponent(props.params.metroarea);

  // Verify that metroArea is an actual metro area. If metroMap[metroArea] is undefined, return an
  // error message.
  if (metroMap[metroArea] === undefined) {
    return (
      <div className="metroarea-wrapper">
        <div className="metroarea">
          <p>There are no weather stations for the metro area that you entered in the URL.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="metroarea-wrapper">
      <div className="metroarea">
        <h2>{metroArea} Metro Area</h2>
        <p>The following cities in the {metroArea} metro area have NOAA weather stations. Click on a city name to view more detailed weather information for that location.</p>
        <ul>
          {metroStationLinks(metroArea, props).map((station) =>
            <CityStationLink {...props} station={station} key={station} />
          )}
        </ul>
      </div>
    </div>
  );
}

export default MetroArea;
