import React from 'react';
import '../css/weathercontext.css';
import stationsObj from '../data/weather.json';

// Function returns a div that toggles between being displayed/invisible depending on clicked status
// of parent component. When visible, it shows the weather averages of a few well known cities. Used
// to help users who want some examples when deciding what weather values they want to pick.
// Takes 3 props: name (name of weather value being referenced), clicked (T/F based on container's
// clicked state), and unit (F, days, etc.). Conditional opperator is present in <li> section because
// names starting with "m" are for monthly average values, which are in an array, and need to be
// accessed differently than other values.
function WeatherContext(props) {

  // Stations to use for examples: Anchorange, Los Angeles, and New York.
  const exampleStations = ["USC00500275", "USC00042214", "USW00094728"];

  return (
    <div className="weather-context" style={props.clicked ? {display: "block"} : {display: "none"}}>
      <ul>
        {exampleStations.map(station => (
          <li key={station}>
            {stationsObj[station]["c"]}, {stationsObj[station]["s"]}: <span className="weather-context-value">{(props.name.charAt(0) === "m") ? stationsObj[station][props.name][12] : stationsObj[station][props.name]} {props.unit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeatherContext
