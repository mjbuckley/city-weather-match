import weatherOptions from '../data/weatheroptions.js';

const minMax = require('../data/minmax.json');

// The value (either max or min possible) for each weather option such no station is excluded by that value.
// Used to fill in valid but partially empty query params.
const defaults = {
  mTmxAv: minMax["mTmxAv"][1],
  mTmnAv: minMax["mTmnAv"][0],
  andTmnLe32: minMax["andTmnLe32"][1],
  andSnGe1: minMax["andSnGe1"][1],
  andSnCGe1: minMax["andSnCGe1"][1],
  andPrGe5Ti: minMax["andPrGe5Ti"][1]
};


// Function takes query param values, validates, and returns a full set of weather values if valid
// and returns {isActive: false} if invalid. Function assumes that at least some query params are present,
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
