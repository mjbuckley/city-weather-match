// Function to build a link's query object. Generally used in buildlink.js.
// Pretty basic right now, but could see needing to do more complex stuff here
// at some point.
export default function buildParams(props) {
  let query = {};

    query["maxTemp"] = props.maxTemp;
    query["lowTemp"] = props.lowTemp;
    query["snowfall"] = props.snowfall;
    query["precip"] = props.precip;
    query["below32"] = props.below32;

  return query;
}
