// import findMatches from './findmatches.js';
import weatherOptions from './data/weatheroptions.js';

const minMax = require('./data/minmax.json');

// This function is placed in the componentWillMount() sections of all direct children components of App (search,
// results, etc.). It checks the URL for query parameters and then determines what App's state
// should be. The URL is the source of truth. This allows for pages to be bookmarkable and it allows for the
// back button to work more naturally (since previos state can be recreated from url). I bother with App state at all
// for 2 reasons: 1) It acts as a sort of cache for matches because most of the time I will do some simple
// calculations from the query params and determine that I can reuse the matches in state and not need to
// recalculate everything, and 2) it generally makes passing around props easier to do (not impossible to do
// otherwise, but it feels more natural).

// NEW 3/5/17:
// Takes props from App (which right now should only be query params) and returns an info object with complete/valid
// weather values or false if such an object is not possible to create based on the query params.
// SHOULD I ADD isActive to true in info?


// HELPER VARIABLES (eventuall extract to stand alone).

// Array of possible weather values
// const weatherOptions = [ "mTmxAv", "mTmnAv", "andTmnLe32", "andSnGe1", "andPrGe5Ti"];

// Maps weather terms I use in the app to weather terms used in minmax.json.
// Ideally I should use the same terms in both places, but for now this is the fix.
// const keyMap = {
//   mTmxAv: "mTmxAv",
//   mTmnAv: "mTmnAv",
//   andTmnLe32: "andTmnLe32",
//   andSnGe1: "andSnGe1",
//   andPrGe5Ti: "andPrGe5Ti"
// };

// Default values are the values that are the extreme min or max of the possible range,
// and the value is such that it would exclude no station.
const defaults = {
  mTmxAv: minMax["mTmxAv"][1],
  mTmnAv: minMax["mTmnAv"][0],
  andTmnLe32: minMax["andTmnLe32"][1],
  andSnGe1: minMax["andSnGe1"][1],
  andSnCGe1: minMax["andSnCGe1"][1],
  andPrGe5Ti: minMax["andPrGe5Ti"][1]
};


// THERE SEEMS TO BE AN ISSUE WHERE IF PICKS UP THE QUERY BUT DOESN'T MAKE IT
// INTO THE INFO.LENGTH>0 IF SECTION.




// Function takes query param values, validates, and returns a full set of weather values if valid
// ane returns {isActive: false} if invalid. Function assumes that at least some query params are present,
// but not that they are valid (checks for presence should be done before this function is called.)
export default function paramsToValues(props) {

  // Object where valid weather values will be stored
  let info = {};

  // Loop through each query param key and add valid values to info object.
  Object.keys(props.location.query).forEach(function(key) {

    // Verify key is a valid weather value name
    if (weatherOptions.includes(key)) {

      // if yes, grab its value
      const value = parseInt(props.location.query[key], 10);

      // Verify that value is an int and is in range of possible values
      if (Number.isInteger(value) &&
          value >= (minMax[key][0]) &&
          value <= (minMax[key][1])) {

        // query param key and value are good, so add to info object
        info[key] = value;
      } // else: valid keys but invalid values (not doing anything for now, will just be missing from info).
    } // else: query params pressent but invalid keys (not doing anything for now, will just be missing from info).
  });


  // AT THIS POINT THE INFO OBJECT IS BUILT. NOW LOOK AT IT'S CONTENTS AND DECIDE WHAT TO DO


  // Check if info contains values
  if (Object.keys(info).length > 0) {

    // Check if info is missing a value
    if (Object.keys(info).length < weatherOptions.length) {

      // info is missing at least one needed value (omitted or invalid in query params).
      // Find keys with missing value(s) and add default value.
      for (let i = 0; i < weatherOptions.length; i++) {
        let option = weatherOptions[i];
        if (info[option] === undefined) {
          info[option] = defaults[option];
        }
      }
    }

    info["isActive"] = true;

  return info;

  } else {
    // Something was in query params, but nothing was valid, so in practice I'm treating it as
    // though there were no query params (some day I could consider error messages to the user, but not
    // sure thats even a good idea, and definately not now). This matches the code in the else statement below.

    return {isActive: false};
  }
}
