import React from 'react';
import metroStationLinks from '../utils/metrostationlinks.js';
import CityStationLink from '../components/citystationlink.js';
import '../css/metroarea.css';
import {Helmet} from "react-helmet";
import metroMap from '../data/metromap.json';


function MetroArea(props) {

  // Metro area name in URL
  const metroArea = decodeURIComponent(props.params.metroarea);
  const description = "View all cities in the " + metroArea + " metro area with a NOAA weather station, with links to weather information for each location.";

  /**
   * Verify that metroArea is an actual metro area. If metroMap[metroArea] is undefined, return an
   * error message.
   */
  if (metroMap[metroArea] === undefined) {
    return (
      <div className="metroarea">

        <Helmet>
          <title>Error | No Stations In Metro Area | City Weather Match</title>
          <meta name="description" content="Error page. There are no cities with NOAA weather stations in this metro area." />
          <meta name="robots" content="noindex" />
        </Helmet>

        <p>There are no cities with weather stations for the metro area that you entered in the URL.</p>
      </div>
    );
  }

  return (
    <div className="metroarea">

      <Helmet>
        <title>{metroArea} Metro Area Weather Stations | City Weather Match</title>
        <meta name="description" content={description} />
      </Helmet>

      <h2>{metroArea} Metro Area</h2>
      <p className="metroarea-intro">The following cities in the {metroArea} metro area have NOAA weather stations. Click on a city name to view more detailed weather information for that location.</p>
      <ul>
        {metroStationLinks(metroArea, props).map((station) =>
          <CityStationLink {...props} station={station} key={station} />
        )}
      </ul>
    </div>
  );
}

export default MetroArea;
