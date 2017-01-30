// Takes an info object with the selected weather values and returns an array of
// stations that match the search criteria.

// The weather info for the NOAA stations.
const stationsObj = require('./data/weather.json');

export default function findMatches(info) {
  let stationMatch = [];
  for (let station in stationsObj) {
    if (parseInt(stationsObj[station]["mlyTMaxAvg"][12], 10) < info["maxTemp"] &&
        parseInt(stationsObj[station]["mlyTMinAvg"][12], 10) > info["lowTemp"] &&
        parseInt(stationsObj[station]["daysBelow32"], 10) < info["below32"] &&
        parseInt(stationsObj[station]["annInchPlus"], 10) < info["snowfall"] &&
        parseInt(stationsObj[station]["annprcpge050hi"], 10) < info["precip"]) {
      stationMatch.push(station);
    };
  };
  return stationMatch;
}
