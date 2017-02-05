import findMatches from './findmatches.js';

// Designed to be run from componentWillMount(). Checks that that query param values match values
// in state. If yes, matches in state are used. If not, matches are recalculated and state is updated.
export default function checkParams(props) {

  // Get query param values from URL
  const maxTemp = parseInt(props.location.query.maxTemp, 10);
  const lowTemp = parseInt(props.location.query.lowTemp, 10);
  const snowfall = parseInt(props.location.query.snowfall, 10);
  const precip = parseInt(props.location.query.precip, 10);
  const below32 = parseInt(props.location.query.below32, 10);

  // Check if query param values match the values in state (which is the same as the current props).
  // If yes, no need to recalculate matches, just use matches from state. If no, then recalculate matches.
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
