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
