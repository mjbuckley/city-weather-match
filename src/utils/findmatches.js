// Takes an info object with the selected weather values and returns an array of
// stations that match the search criteria.

// The weather info for the NOAA stations.
const stationsObj = require('../data/weather.json');

export default function findMatches(info) {
  let stationMatch = [];
  for (let station in stationsObj) {
    if (parseInt(stationsObj[station]["mTmxAv"][12], 10) < info["mTmxAv"] &&
        parseInt(stationsObj[station]["mTmnAv"][12], 10) > info["mTmnAv"] &&
        parseInt(stationsObj[station]["andTmnLe32"], 10) < info["andTmnLe32"] &&
        parseInt(stationsObj[station]["andSnGe1"], 10) < info["andSnGe1"] &&
        parseInt(stationsObj[station]["andSnCGe1"], 10) < info["andSnCGe1"] &&
        parseInt(stationsObj[station]["andPrGe5Ti"], 10) < info["andPrGe5Ti"]) {
      stationMatch.push(station);
    };
  };
  return stationMatch;
}
