// Here is the new idea: The state determines the url, but the url is the source of the pages info.
// So, all pages (except probably a station page) will be passed query params that will allow the page
// to load as needed. I can still use state to speed up things be checking if params match state values
// and if yes then using pre calculated values in matches (most use cases), but this way any page can always
// be recreated. Also, it avoids setting state from url, which would probably work properly 95% of the time,
// but I can imagine situations where this could have weird results. This strategy wouldn't work for all
// apps, but I think it makes sense here.


// let lt = this.props.params.lt;
// let ht = this.props.params.ht;
//
// if (this.state.lt === lt && this.state.ht = ht) {
//   let matches = this.state.matches;
// } else {
//   let matches = matchesFunction(lt, ht) {
//     // stuff here
//   }
//
// }

// I believe this works for adding query params, but can't find it doucmented anywhere
// <Link to={{ pathname: '/path/subpath', query: { key: value, key2: value2} }}>
//
// You can then access the params with this.props.location.query.keyname


// Returns matches

// Huge oversimplification of what will be needed, but this is the minimal gist.
// Will eventually need to:
// 1) sanitize
// 2) uridecode
// 3) account for possibility that all params might not be used
// 4) figure out error handling (suppose params return no matches/params are no good, etc.)
// 5) Check if params exist at all?
// 6) Check if state has been set at all in the first place.
// 7) etc.



// FUNCTION STARTS HERE run in componentWillMount()?
// Right now this assumes that all queries are pressent and valid. I might make some things
// optional in the future, and also check for validity.

import findMatches from './findmatches.js';

export default function checkParams(props) {

  const query = props.location.query;

  const maxTemp = parseInt(query.maxTemp, 10);
  const lowTemp = parseInt(query.lowTemp, 10);
  const snowfall = parseInt(query.snowfall, 10);
  const precip = parseInt(query.precip, 10);
  const below32 = parseInt(query.below32, 10);



  // Do values in query params match values in state. If yes, no need to recreate matches, just use matches.
  // If no, then need to determine matches.

  if (maxTemp === props.maxTemp &&
      lowTemp === props.lowTemp &&
      snowfall === props.snowfall &&
      precip === props.precip &&
      below32 === props.below32) {
    return;
  } else {
    let info = {
      maxTemp: maxTemp,
      lowTemp: lowTemp,
      below32: snowfall,
      snowfall: precip,
      precip: below32
    };
    const matches = findMatches(info);
    info["matches"] = matches;

    props.updateWeatherState(info);
  }
}
// NOT SURE if updating state here will result in new values being available in the render function.
// I think yes, but double check.

// SEEM TO BE mostly working? but I think if you are on the results page and then type in a new results
// address, React Router treats that as passing in new props but not a fresh mount of the component, so
// the info doesn't update. IF you use the refresh button though then it does. Deal with this.


// NEED TO SEPERATE updateWeatherState() into seperate components. Probably
// a function to find matches, one to update state, and one to redirect (if
// it even needs to be a function).




// Key for query params
//
// maxTemp: mt
// lowTemp: lt
// snowfall: sn
// precip: pr
// below32: bf
