// Takes an info object with the selected weather values and returns an array of
// stations that match the search criteria.

// The weather info for the NOAA stations.
const stationsObj = require('../data/weather.json');

export default function findMatches(info) {
  let stationMatch = [];
  for (let station in stationsObj) {
    if (Number(stationsObj[station]["mTmxAv"][12]) <= info["hMTmxAvLe"] &&
        Number(stationsObj[station]["mTmnAv"][12]) >= info["lMTmnAvGe"] &&
        Number(stationsObj[station]["andSnGe1"]) <= info["andSnGe1Le"] &&
        Number(stationsObj[station]["andSnGe1"]) >= info["andSnGe1Ge"] &&
        Number(stationsObj[station]["andSnCGe1"]) <= info["andSnCGe1Le"] &&
        Number(stationsObj[station]["andSnCGe1"]) >= info["andSnCGe1Ge"] &&
        Number(stationsObj[station]["andPrGe5Ti"]) <= info["andPrGe5TiLe"] &&
        Number(stationsObj[station]["andPrGe5Ti"]) >= info["andPrGe5TiGe"] &&
        Number(stationsObj[station]["andTmnLe32"]) <= info["andTmnLe32Le"] &&
        Number(stationsObj[station]["andTmnLe32"]) >= info["andTmnLe32Ge"] &&
        Number(stationsObj[station]["andTmxGe60"]) <= info["andTmxGe60Le"] &&
        Number(stationsObj[station]["andTmxGe60"]) >= info["andTmxGe60Ge"] &&
        Number(stationsObj[station]["andTmxGe80"]) <= info["andTmxGe80Le"] &&
        Number(stationsObj[station]["andTmxGe80"]) >= info["andTmxGe80Ge"]) {

        stationMatch.push(station);
    };
  };
  return stationMatch;
}
