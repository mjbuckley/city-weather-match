import React from 'react';
import CityList from './citylist.js';

// Returns a list grouping for one letter. One of these will be created for each letter needed
// based on search results (no letter section returned if no city with that first letter is in results).
function AlphaListSection(props) {

  return (
    <div>
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
