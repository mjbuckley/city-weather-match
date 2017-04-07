// Function to build a link's query object. Generally used in buildlink.js.
// Pretty basic right now, but could see needing to do more complex stuff here
// at some point.
export default function buildParams(props) {

  let query = {};

    query["mTmxAv"] = props.mTmxAv;
    query["mTmnAv"] = props.mTmnAv;
    query["andSnGe1"] = props.andSnGe1;
    query["andSnCGe1"] = props.andSnCGe1;
    query["andPrGe5Ti"] = props.andPrGe5Ti;
    query["andTmnLe32"] = props.andTmnLe32;

  return query;
}
