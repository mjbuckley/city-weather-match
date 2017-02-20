import findMatches from './findmatches.js';

const minMax = require('./data/minmax.json');

// Function placed in the componentWillMount() (and maybe componentWillReceiveProps?) sections of all direct
// children components of App. It checks the URL for query parameters and then determines what App's state
// should be. The URL is the source of truth. (I bother with App state at all for 2 reasons: 1) It acts as a sort of
// cache for matches because most of the time I will do some simple calculations from the query params and determine
// that I can reuse matches and not need to recalculate, and 2) generally makes passing around props easier (not
// impossible to do otherwise, but works well). More generally the URL source of truth allows
// for pages to be bookmarkable, and it makes the back button work in a more natural way (since previous states
// can be recreated).

// Does several things:
// 1) Make sure query param keys and values are valid.
// 2) If query params are incomplete it will fill in missing values with default values.
// 3) Compares query param values with values currently in app state. If different, update state with
// new information from query params. If unchanged, use values currently in state.
// 4) Handle situation where there are no query params or only jibberish params.

// QUESTION: I pass in props, but aren't props already available here? Any reason to do this?
// QUESTION: Should I have the helper variables in the function?

// -I've decided that all possible values will be given a value. If they say they don't care then
// the min/max value will be assigned that matches all possible scenarios.

// -This whole thing works as I want, but I should consider breaking it up into more manageble pieces.
// Also, I really need to document things better. Not so much the individual steps, but the whole app and
// the querks and oddities in the setup (and why I still have them there).


// HELPER VARIABLES

// Array of possible weather values
const weatherOptions = [ "maxTemp", "lowTemp", "below32", "snowfall", "precip"];

// Maps weather terms I use in the app to weather terms used in minmax.json.
// Ideally I should use the same terms in both places, but for now this is the fix.
const keyMap = {
  maxTemp: "mlyTMaxAvg",
  lowTemp: "mlyTMinAvg",
  below32: "daysBelow32",
  snowfall: "annInchPlus",
  precip: "annprcpge050hi"
};

// Default values are the values that are the extreme min or max of the possible range,
// and the value is such that it would exclude no station.
const defaults = {
  maxTemp: minMax["mlyTMaxAvg"][1],
  lowTemp: minMax["mlyTMinAvg"][0],
  below32: minMax["daysBelow32"][1],
  snowfall: minMax["annInchPlus"][1],
  precip: minMax["annprcpge050hi"][1]
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

        // if yes, grab its value (NOT SURE if I can use key this way or if I need to access differently)
        const value = parseInt(props.location.query[key], 10);

        // Temporary fix because different names are used in the app and in minmax.json.
        // Eventually I will fix this and can just use key instead.
        const tempKey = keyMap[key];

        // Verify that value is an int and is in range of possible values
        if (Number.isInteger(value) &&
            value >= (minMax[tempKey][0]) &&
            value <= (minMax[tempKey][1])) {

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
        Object.keys(info).forEach(function(key) {
          if (info[key] === undefined) {
            info[key] = defaults[key];
          }
        });
      }

      // At this point we're at a place where info has all values and all values are valid.
      // Compare info values (from query params) to prop values (current values) to decide if state should
      // be updated. Much of this code will be in the original function above.

      if (props.clicked === true &&
          info.maxTemp === props.maxTemp &&
          info.lowTemp === props.lowTemp &&
          info.snowfall === props.snowfall &&
          info.precip === props.precip &&
          info.below32 === props.below32) {

        // values in query params are unchanged from that saved in state. No need to calculate matches or change state.
        return;
      } else {

        // values in query params differ from those in state. Recalculate matches and then update app state with
        // the new values.
        const matches = findMatches(info);
        info["matches"] = matches;
        info["clicked"] = true;

        props.updateWeatherState(info);
      }
    } else {
      // Something was in query params, but nothing was valid, so in practice I'm treating it as
      // though there were no query params (some day I could consider error messages to the user, but not
      // sure thats even a good idea, and definately not now). This matches the code in the else statement below.

      let info = {
        clicked: false,
        maxTemp: props.maxTemp,
        lowTemp: props.lowTemp,
        snowfall: props.snowfall,
        precip: props.precip,
        below32: props.below32,
        matches: props.matches
      };

      // Update App state
      props.updateWeatherState(info);
    }
  } else {

    // There are no query params. In general, most pages can function fine without query params. Each page will
    // decide what to do (doesn't need to be handled here). Change cicked value to false so pages/compents know
    // not to use values in state.

    // In hindsite I probably should have designed updateWeatherState differently, but it expects all values to be
    // present, so that's why all values are in the below info object. Clicked is the only value the really matters
    // here (since clicked is set to false the other values will never be used for anything except to prepopulate the
    // search range slider). Also, even though the weather values won't really be used, I know that the
    // prop values exist and are in acceptible range because they have a default state that is set in App.
    let info = {
      clicked: false,
      maxTemp: props.maxTemp,
      lowTemp: props.lowTemp,
      snowfall: props.snowfall,
      precip: props.precip,
      below32: props.below32,
      matches: props.matches
    };

    // Update App state
    props.updateWeatherState(info);
  }
}



// OLD WORKING BUT LESS FUNCTIONAL CHECKPARAMS() IS BELOW. KEEP UNTIL SURE NEW STUFF IS WORKING OK.

// export default function checkParams(props) {
//
//   // Get query param values from URL
//   const maxTemp = parseInt(props.location.query.maxTemp, 10);
//   const lowTemp = parseInt(props.location.query.lowTemp, 10);
//   const snowfall = parseInt(props.location.query.snowfall, 10);
//   const precip = parseInt(props.location.query.precip, 10);
//   const below32 = parseInt(props.location.query.below32, 10);
//
//   // Check if query param values match the values in state (which is the same as the current props).
//   // If yes, no need to recalculate matches, just use matches from state. If no, then recalculate matches.
//   if (maxTemp === props.maxTemp &&
//       lowTemp === props.lowTemp &&
//       snowfall === props.snowfall &&
//       precip === props.precip &&
//       below32 === props.below32) {
//     return;
//   } else {
//     let info = {
//       maxTemp: maxTemp,
//       lowTemp: lowTemp,
//       below32: snowfall,
//       snowfall: precip,
//       precip: below32
//     };
//     const matches = findMatches(info);
//     info["matches"] = matches;
//
//     props.updateWeatherState(info);
//   }
// }
