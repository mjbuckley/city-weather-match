import React from 'react';
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



// Below is the old version (possibly slightly modified?) that I'm keeping around for a bit
// until I'm sure the new version is working finr.

// import React from 'react';
// import { Link } from 'react-router';
// import findCityLink from './findcitylink.js';
// import buildLink from './buildlink.js';
//
// const stationsObj = require('./data/weather.json');
// const metroMap = require('./data/metromap.json'); // Mapping of metro areas to cities to stations
//
// function MetroArea(props) {
//
//   // Metro area name in URL
//   const metroArea = decodeURIComponent(props.params.metroarea);
//
//   // Verify that metroArea param is an actual metro area (metroMap[metroArea] will be undefined if metro area invalid)
//   if (metroMap[metroArea]) {
//
//     // Array of every city in metroArea
//     const cities = Object.keys(metroMap[metroArea]);
//
//     return (
//       <div>
//         <h2>{metroArea} Urban Area</h2>
//         <ul>
//           {cities.map(function(city, index) {
//
//             // Get station number of station to link to.
//             const linkStation = findCityLink(city, metroArea, props.matches);
//
//             // Build link info
//             const state = stationsObj[linkStation]["state"];
//             const path ="/location/" + encodeURIComponent(city) + "/" + state + "/" + encodeURIComponent(linkStation);
//
//             // Return li/link
//             return (<li key={index}><Link to={buildLink(props, path)}>{city}</Link></li>);
//           })}
//         </ul>
//       </div>
//     );
//
//   // Metro area name in url is invalid. Return error message.
//   } else {
//
//     return (
//       <div>
//         <p>There are no weather stations for the metro area that you entered in the URL.</p>
//       </div>
//     );
//   }
// }
//
// export default MetroArea;
