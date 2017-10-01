// Takes an info object with the selected weather values and returns an array of
// stations that match the search criteria.

// The weather info for the NOAA stations.
const stationsObj = require('../data/weather.json');

// const stationsObj = (async () => {
//     await import('../data/weather.json');
// })();

export default function findMatches(info) {
  let stationMatch = [];
  for (let station in stationsObj) {

    if (stationsObj[station]["mTmxAv"][12] <= info["hMTmxAvLe"] &&
        stationsObj[station]["mTmnAv"][12] >= info["lMTmnAvGe"] &&
        stationsObj[station]["andSnGe1"] <= info["andSnGe1Le"] &&
        stationsObj[station]["andSnGe1"] >= info["andSnGe1Ge"] &&
        stationsObj[station]["andSnCGe1"] <= info["andSnCGe1Le"] &&
        stationsObj[station]["andSnCGe1"] >= info["andSnCGe1Ge"] &&
        stationsObj[station]["andPrGe5Ti"] <= info["andPrGe5TiLe"] &&
        stationsObj[station]["andPrGe5Ti"] >= info["andPrGe5TiGe"] &&
        stationsObj[station]["andTmnLe32"] <= info["andTmnLe32Le"] &&
        stationsObj[station]["andTmnLe32"] >= info["andTmnLe32Ge"] &&
        stationsObj[station]["andTmxGe60"] <= info["andTmxGe60Le"] &&
        stationsObj[station]["andTmxGe60"] >= info["andTmxGe60Ge"] &&
        stationsObj[station]["andTmxGe80"] <= info["andTmxGe80Le"] &&
        stationsObj[station]["andTmxGe80"] >= info["andTmxGe80Ge"]) {

        stationMatch.push(station);
    };
  };
  return stationMatch;
}
