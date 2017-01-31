// Build a link's query params. Example usage:
//
// let path = "/path/subpath";
// let query = buildParams(props);
// let link = {
//   pathname: path,
//   query: query
// };
//
// <Link to={link}>

export default function buildParams(props) {
  let query = {};

    query["maxTemp"] = props.maxTemp;
    query["lowTemp"] = props.lowTemp;
    query["snowfall"] = props.snowfall;
    query["precip"] = props.precip;
    query["below32"] = props.below32;

  return query;
}
