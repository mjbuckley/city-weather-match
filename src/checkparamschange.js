import checkParams from './checkparams.js';

// React Router does not treat a change in query params as a new mounting of the component, so
// doing something like navigating to a bookmarked results page from a current results page would
// not change the results. This function is run from componentWillReceiveProps and it checks if the
// query param values (which are props) have changed and then calls checkparams.js if needed to
// determine the needed state changes.
export default function checkParamsChange(nextProps, props) {

  // This can almost certainly be done better than this, but I need to look in to how JS handles
  // accessing non-existent object properties. Also, would be good to do this in a way to not need
  // to remember to alter this every time I add a weather value.
  if (!nextProps.location.query ||
      Object.keys(nextProps.location.query).length === 0 ||
      !nextProps.location.query.maxTemp ||
      nextProps.location.query.maxTemp !== props.location.query.maxTemp ||
      !nextProps.location.query.lowTemp ||
      nextProps.location.query.lowTemp !== props.location.query.lowTemp ||
      !nextProps.location.query.below32 ||
      nextProps.location.query.below32 !== props.location.query.below32 ||
      !nextProps.location.query.snow ||
      nextProps.location.query.snow !== props.location.query.snow ||
      !nextProps.location.query.precip ||
      nextProps.location.query.precip !== props.location.query.precip
  ) {
    checkParams(nextProps);
  }
}

// Convert nextProps to int?


// Old working version
//
// export default function checkParamsChange(nextProps, props) {
//
//   if (nextProps.location.query.maxTemp !== props.location.query.maxTemp ||
//       nextProps.location.query.lowTemp !== props.location.query.lowTemp ||
//       nextProps.location.query.below32 !== props.location.query.below32 ||
//       nextProps.location.query.snow !== props.location.query.snow ||
//       nextProps.location.query.precip !== props.location.query.precip
//   ) {
//     let info = {
//       maxTemp: nextProps.location.query.maxTemp,
//       lowTemp: nextProps.location.query.lowTemp,
//       below32: nextProps.location.query.snowfall,
//       snowfall: nextProps.location.query.precip,
//       precip: nextProps.location.query.below32
//     };
//     const matches = findMatches(info);
//     info["matches"] = matches;
//
//     props.updateWeatherState(info);
//   }
// }
