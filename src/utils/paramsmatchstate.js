import weatherOptions from '../data/weatheroptions.json';


/**
 * Checks to see if next contains the same weather values as current. Meant to check url query
 * params(next) against state(current) in componentWillMount (in which case next is
 * this.props.location.query), or in componentWillReceiveProps (in which case next is
 * nextProps.location.query). Returns true if values are the same, otherwise false.
 */
export default function paramsMatchState(next, current) {

  let match = true;

  weatherOptions["weatherOptions"].forEach(function(option) {
    if (parseInt(next[option], 10) !== current[option]) {
      match = false;
    }
  });

  return match;
}
