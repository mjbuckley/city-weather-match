import React from 'react';
import CityList from './citylist.js';
import '../css/alphalistsection.css';


/**
 * Takes an array of result cities that start with the same letter and returns them in a formatted
 * grouping ready for display.
 */
function AlphaListSection(props) {

  return (
    <div className="AlphaListSection">
      <h3>{props.letter}</h3>
      <ul>
        {props.stations.map(station => (
          <CityList
            key={station}
            station={station}
            weatherValues={props.weatherValues}
            isActive={props.isActive}
          />
        ))}
      </ul>
    </div>
  );
}

export default AlphaListSection;
