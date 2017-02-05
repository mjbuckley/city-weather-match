import findMatches from './findmatches.js';

// React Router does not treat a change in query params as a new mounting of the component, so
// doing something like navigating to a bookmarked results page from a current results page would
// not change the results. This looks for query param changes (which are also prop changes),
// and makes state changes as needed.
export default function checkParamsChange(nextProps, props) {

  if (nextProps.location.query.maxTemp !== props.location.query.maxTemp ||
      nextProps.location.query.lowTemp !== props.location.query.lowTemp ||
      nextProps.location.query.below32 !== props.location.query.below32 ||
      nextProps.location.query.snow !== props.location.query.snow ||
      nextProps.location.query.precip !== props.location.query.precip
  ) {
    let info = {
      maxTemp: nextProps.location.query.maxTemp,
      lowTemp: nextProps.location.query.lowTemp,
      below32: nextProps.location.query.snowfall,
      snowfall: nextProps.location.query.precip,
      precip: nextProps.location.query.below32
    };
    const matches = findMatches(info);
    info["matches"] = matches;

    props.updateWeatherState(info);
  }
}
