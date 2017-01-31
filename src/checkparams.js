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







// NOTE I BELIEVE I NEED TO USE encodeURIComponent() not encodeURI() when adding query params
// (and decode with decodeURIComponent).

function checkParams() {

  const queryParams = this.props.location.query;

  if (
    queryParams.maxTemp === this.props.maxTemp &&
    queryParams.lowTemp === this.props.lowTemp &&
    queryParams.snowfall === this.props.snowfall &&
    queryParams.precip === this.props.precip &&
    queryParams.below32 === this.props.below32
  ) {
    return this.props.matches;
  } else {
    // const matches = function to determine matches;

    const info = {
      maxTemp: queryParams.mt,
      lowTemp: queryParams.lt,
      below32: queryParams.sn,
      snowfall: queryParams.pr,
      precip: queryParams.bf
    };


    this.props.updateWeatherState(info, false);
  }
}


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
