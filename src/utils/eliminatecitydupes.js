// Takes an array of station matches and returns an array with only one station per city.
// The first station in a city is kept, and all others are discarded.
function eliminateCityDupes(matches) {
  const stationsObj = require('../data/weather.json');
  let previousValue = "";

  return matches.filter(function(station) {
    const city = stationsObj[station]["c"];
    const state = stationsObj[station]["s"];

    if ((city + state) !== previousValue) {
      previousValue = city + state;
      return true;
    } else {
      return false;
    }
  });
}

export default eliminateCityDupes;
