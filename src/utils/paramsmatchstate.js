import weatherOptions from '../data/weatheroptions.js';

// Check to see if next contains the same weather values as current. Meant to check url query params against state
// (current) in componentWillMount (in which case next is this.props.location.query), or in componentWillReceiveProps
// (in which case next is nextProps.location.query). Returns true if values are the same, otherwise false.
export default function paramsMatchState(next, current) {

  let match = true;

  weatherOptions.forEach(function(option) {
    if (next[option] !== current[option]) {
      match = false;
    }
  });

  return match;
}
