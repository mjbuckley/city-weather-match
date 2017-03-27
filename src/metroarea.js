// import React from 'react';
// import { Link } from 'react-router';
// import buildLink from './buildlink.js';
//
// const stationsObj = require('./data/weather.json');
// const metroMap = require('./data/metromap.json'); // Mapping of metro areas to cities to stations
//
// function MetroArea(props) {
//
//   // The map function below should probably be cleaned up, but it works. Here's what's happening:
//   // -cities is an array of all city names in the metro area.
//   // -metroMap[metroArea][city] is an array of all stations in city.
//   // -The map function loops through each city in cities and looks to find the first station for each city
//   // that is part of props.matches. The first one found is returned as a link to that station.
//   // -If no match is found, then the link is to the first station in the stations array.
//   // -Note: includes() returns T/F. find() returns the first value it hits that satisfies the test function,
//   // and it returns undefined if nothing satisfies the function).
//   // -I have to pass in a thisArg two times to access the class's this. Works but confusing. Consider fat
//   // arrow function.
//   render() {
//
//     const metroArea = decodeURIComponent(props.params.metroarea); // Metro area name in URL
//     const cities = Object.keys(metroMap[metroArea]); // Every city in metroArea
//
//     return (
//       <div>
//         <h2>{metroArea} Urban Area</h2>
//         <ul>
//           {cities.map(function(city, index) {
//
//             let linkStation = cities.find(function(index) {
//               return props.matches.includes(metroMap[metroArea][city][index])
//             }, this);
//
//             if (linkStation === undefined) {
//               linkStation = metroMap[metroArea][city][0];
//             }
//
//             const state = stationsObj[linkStation]["state"];
//             const path ="/location/" + encodeURIComponent(city) + "/" + state + "/" + encodeURIComponent(linkStation);
//             return (<li key={index}><Link to={buildLink(props, path)}>{city}</Link></li>);
//           }, this)}
//         </ul>
//       </div>
//     );
//   }
// }
//
// export default MetroArea;
//
// // Take array of cities in metro area and find the first station in each city that is part of matches.
// // If no stations are a match, then return the first station (should I note matche/non-match in props?).
//
// cities = [city1, city2, etc.];
// metroMap[metroArea][city1] = [station1, station2, etc];
//
// Return list of links, then map.
//
//
//
// let linkItems = [];
//
// cities.forEach(function(city) {
//
//
// });
//
//
// // BELOW CODE IS NOT FULLY WORKING BUT IS PROBABLY ON THE RIGHT TRACK.
//
// function findLinkForCity() {
//   // Returns an array with all stations in a city that are in matches.
//   const stationMatchesInCity = metroMap[metroArea][city].filter(function(station) {
//     return props.matchs.includes(station);
//   });
//
//   if (stationMatchesInCity.length > 0) {
//     return stationMatchesInCity[0];
//   } else {
//     return metroMap[metroArea][city][0];
//   }
// }
//
// const city links = cities.map(findLinkForCity(city));




//
// NEW 3/22/17
//



import React from 'react';
import { Link } from 'react-router';
import findCityLink from './findcitylink.js';
import buildLink from './buildlink.js';

const stationsObj = require('./data/weather.json');
const metroMap = require('./data/metromap.json'); // Mapping of metro areas to cities to stations

function MetroArea(props) {

  const metroArea = decodeURIComponent(props.params.metroarea); // Metro area name in URL

  // Verify that metroArea param is an actual metro area (metroMap[metroArea] will be undefined if metro area invalid)
  if (metroMap[metroArea]) {

    const cities = Object.keys(metroMap[metroArea]); // Every city in metroArea

    return (
      <div>
        <h2>{metroArea} Urban Area</h2>
        <ul>
          {cities.map(function(city, index) {

            // Get station number of station to link to.
            const linkStation = findCityLink(city, metroArea, props.matches);

            // Build link info
            const state = stationsObj[linkStation]["state"];
            const path ="/location/" + encodeURIComponent(city) + "/" + state + "/" + encodeURIComponent(linkStation);

            // Return li/link
            return (<li key={index}><Link to={buildLink(props, path)}>{city}</Link></li>);
          })}
        </ul>
      </div>
    );
  } else {

    return (
      <div>
        <p>The metro area that you entered in the URL is not a part of this site's weather dataset.</p>
      </div>
    );
  }
}

export default MetroArea;
