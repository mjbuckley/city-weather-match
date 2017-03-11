import weatherOptions from './data/weatheroptions.js';

// Quick check to see if query params match state values. Since only valid values
// can ever be stored in state, if they match then the validity check can be bypassed
// (although it should still be checked if state.clicked is true or false).
export default function paramsMatchState(next, current) {

  let match = true;

  weatherOptions.forEach(function(option) {
    if (next.location.query[option] !== current[option]) {
      match = false;
    }
  });

  return match;
}

// BELOW is an incomplete and probably not needed idea to see if params match the default initial state values.
// import weatherOptions from './data/weatheroptions.js';
// import keyMap from ',/keyMap.js';
//
// const weatherConst = require('./data/minmax.json');
//
// function paramsEqualsDefault(params) {
//   let same = true;
//
//   Object.keys(weatherOptions).forEach(function(option) {
//     const fixedOption = keyMap[option]; // Maps weatherOption name to name used in weather.json
//     if (params[option] !== weatherConst[fixedOption][2]) {
//       return false;
//     }
//   }
// });
