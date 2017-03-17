import findMatches from './findmatches.js';

const minMax = require('./data/minmax.json');

// This function is placed in the componentWillMount() sections of all direct children components of App (search,
// results, etc.). It checks the URL for query parameters and then determines what App's state
// should be. The URL is the source of truth. This allows for pages to be bookmarkable and it allows for the
// back button to work more naturally (since previos state can be recreated from url). I bother with App state at all
// for 2 reasons: 1) It acts as a sort of cache for matches because most of the time I will do some simple
// calculations from the query params and determine that I can reuse the matches in state and not need to
// recalculate everything, and 2) it generally makes passing around props easier to do (not impossible to do
// otherwise, but it feels more natural).


// HELPER VARIABLES (eventuall extract to stand alone).

// Array of possible weather values
const weatherOptions = [ "mTmxAv", "mTmnAv", "andTmnLe32", "andSnGe1", "andPrGe5Ti"];

// Default values are the values that are the extreme min or max of the possible range,
// and the value is such that it would exclude no station.
const defaults = {
  mTmxAv: minMax["mTmxAv"][1],
  mTmnAv: minMax["mTmnAv"][0],
  andTmnLe32: minMax["andTmnLe32"][1],
  andSnGe1: minMax["andSnGe1"][1],
  andPrGe5Ti: minMax["andPrGe5Ti"][1]
};


// THERE SEEMS TO BE AN ISSUE WHERE IF PICKS UP THE QUERY BUT DOESN'T MAKE IT
// INTO THE INFO.LENGTH>0 IF SECTION.
export default function checkParams(props) {

  // Check if query params are even there are all:
  if (props.location.query && (Object.keys(props.location.query).length > 0)) {
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

      // At this point we're at a place where info has all values and all values are valid.
      // Compare info values (from query params) to prop values (current values) to decide if state should
      // be updated. Much of this code will be in the original function above.

      if (props.isActive === true &&
          info.mTmxAv === props.mTmxAv &&
          info.mTmnAv === props.mTmnAv &&
          info.andSnGe1 === props.andSnGe1 &&
          info.andPrGe5Ti === props.andPrGe5Ti &&
          info.andTmnLe32 === props.andTmnLe32) {

        // values in query params are unchanged from that saved in state. No need to calculate matches or change state.
        return;
      } else {
        // values in query params differ from those in state. Recalculate matches and then update app state with
        // the new values.
        const matches = findMatches(info);
        info["matches"] = matches;
        info["isActive"] = true;

        props.updateWeatherState(info);
      }
    } else {
      // Something was in query params, but nothing was valid, so in practice I'm treating it as
      // though there were no query params (some day I could consider error messages to the user, but not
      // sure thats even a good idea, and definately not now). This matches the code in the else statement below.

      let info = {
        isActive: false,
        mTmxAv: props.mTmxAv,
        mTmnAv: props.mTmnAv,
        andSnGe1: props.andSnGe1,
        andPrGe5Ti: props.andPrGe5Ti,
        andTmnLe32: props.andTmnLe32,
        matches: props.matches
      };

      // Update App state
      props.updateWeatherState(info);
    }
  } else {
    console.log("Nothing in params");

    // There are no query params. In general, most pages can function fine without query params. Each page will
    // decide what to do (doesn't need to be handled here). Change cicked value to false so pages/compents know
    // not to use values in state.

    // In hindsite I probably should have designed updateWeatherState differently, but it expects all values to be
    // present, so that's why all values are in the below info object. isActive is the only value the really matters
    // here (since isActive is set to false the other values will never be used for anything except to prepopulate the
    // search range slider). Also, even though the weather values won't really be used, I know that the
    // prop values exist and are in acceptible range because they have a default state that is set in App.
    let info = {
      isActive: false,
      mTmxAv: props.mTmxAv,
      mTmnAv: props.mTmnAv,
      andSnGe1: props.andSnGe1,
      andPrGe5Ti: props.andPrGe5Ti,
      andTmnLe32: props.andTmnLe32,
      matches: props.matches
    };

    // Update App state
    props.updateWeatherState(info);
  }
}
