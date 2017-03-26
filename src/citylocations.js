import React from 'react';
import { Link } from 'react-router'
import buildLink from './buildlink.js';

const stationsObj = require('./data/weather.json');

function CityLocations(props) {

  const city = decodeURIComponent(props.params.city);
  const state = decodeURIComponent(props.params.state);

  // Find all stations in city. Works fine, but would a precomputed json file be better?
  let locations = [];
  Object.keys(stationsObj).forEach(function(station) {
    if ( (stationsObj[station]["city"] === city) &&
    (stationsObj[station]["state"] === state) ) {
      locations.push(station);
    }
  });


  // Check for location.length === 0 to check for the possibility that an means an invalid city and/or
  // state name was entered.
  return (
    <div>
      {(locations.length === 0) ? (

        <p>Sorry, the name you entered is not in the database</p>

      ) : (
        <div>
          <h2>{city}, {state}</h2>

          {(locations.length > 1) ? (
            <p>There are several weather stations in {city}:</p>
          ) : null}

          <ul>
            {locations.map(function(station) {
              const path = "/location/" + encodeURIComponent(city) + "/" + state + "/" + station;
              return (<li key={station}><Link to={buildLink(props, path)}>Station {station}</Link></li>);
            })}
          </ul>
        </div>

      )}
    </div>
  );
}

export default CityLocations;

// GOOD 3/25/17
//   return (
//     <div>
//       <h2>{city}, {state}</h2>
//
//       {(locations.length > 1) ? (
//         <p>There are several weather stations in {city}:</p>
//       ) : null}
//
//       <ul>
//         {locations.map(function(station) {
//           const path = "/location/" + encodeURIComponent(city) + "/" + state + "/" + station;
//           return (<li key={station}><Link to={buildLink(props, path)}>Station {station}</Link></li>);
//         })}
//       </ul>
//     </div>
//   );
// }
