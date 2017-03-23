// Takes an array of station(s) in a city. Returns the first station that is in matches. If no station is
// in matches then it returns the first station in the array.
function findCityLink(city, metroArea, matches) {

  // Mapping of metro areas to cities to stations: {metroArea: {city: [station1, station2], city2: [station]}}
  const metroMap = require('./data/metromap.json');

  // Creates an array with all stations in a city that are in matches.
  const stationMatchesInCity = metroMap[metroArea][city].filter(function(station) {
    return matches.includes(station);
  });

  // return first matching station if one exists, else return first station in city stations array.
  if (stationMatchesInCity.length > 0) {
    return stationMatchesInCity[0];
  } else {
    return metroMap[metroArea][city][0];
  }
}

export default findCityLink
