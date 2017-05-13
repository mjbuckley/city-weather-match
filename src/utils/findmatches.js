// Takes an info object with the selected weather values and returns an array of
// stations that match the search criteria.

// The weather info for the NOAA stations.
const stationsObj = require('../data/weather.json');

export default function findMatches(info) {
  let stationMatch = [];
  for (let station in stationsObj) {
    if (parseInt(stationsObj[station]["mTmxAv"][12], 10) <= info["hMTmxAvLe"] &&
        parseInt(stationsObj[station]["mTmnAv"][12], 10) >= info["lMTmnAvGe"] &&
        parseInt(stationsObj[station]["andSnGe1"], 10) <= info["andSnGe1Le"] &&
        parseInt(stationsObj[station]["andSnGe1"], 10) >= info["andSnGe1Ge"] &&
        parseInt(stationsObj[station]["andSnCGe1"], 10) <= info["andSnCGe1Le"] &&
        parseInt(stationsObj[station]["andSnCGe1"], 10) >= info["andSnCGe1Ge"] &&
        parseInt(stationsObj[station]["andPrGe5Ti"], 10) <= info["andPrGe5TiLe"] &&
        parseInt(stationsObj[station]["andPrGe5Ti"], 10) >= info["andPrGe5TiGe"] &&
        parseInt(stationsObj[station]["andTmnLe32"], 10) <= info["andTmnLe32Le"] &&
        parseInt(stationsObj[station]["andTmnLe32"], 10) >= info["andTmnLe32Ge"] &&
        parseInt(stationsObj[station]["andTmxGe60"], 10) <= info["andTmxGe60Le"] &&
        parseInt(stationsObj[station]["andTmxGe60"], 10) >= info["andTmxGe60Ge"] &&
        parseInt(stationsObj[station]["andTmxGe80"], 10) <= info["andTmxGe80Le"] &&
        parseInt(stationsObj[station]["andTmxGe80"], 10) >= info["andTmxGe80Ge"]) {

        stationMatch.push(station);
    };
  };
  return stationMatch;
}
