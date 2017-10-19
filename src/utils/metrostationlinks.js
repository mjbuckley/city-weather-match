import metroMap from '../data/metromap.json'; // Mapping of metro areas to cities to stations: {metroArea: {city: [station1, station2], city2: [station]}, etc.}

// The MetroArea page contains a list of cities in the given metro area. Each city name in the list links to a
// station in that city. This function is used to find the stations that should be linked to. It takes a metro
// area name and returns an array of station id(s), with one station for each city in the metro
// area. If isActive, it returns the first station in each city that is also in matches. If no station is in
// matches (or if !isActive) then it just returns the first station in each city.
function metroStationLinks(metroArea, props) {

  // Array of all cities in metroArea
  const cities = Object.keys(metroMap[metroArea]);

  if (props.isActive) {

    return cities.map(function(city) {

      // Find first station in city that is in matches (if it exists)
      const matchingStation = metroMap[metroArea][city].find(function(station) {
        return props.matches.includes(station);
      });

      // Return first matching station (if it exist) or first station in city's stations array
      return matchingStation ? matchingStation : metroMap[metroArea][city][0];
    });
  } else {

    return cities.map(function(city) {
      return metroMap[metroArea][city][0];
    });
  }

}

export default metroStationLinks;
