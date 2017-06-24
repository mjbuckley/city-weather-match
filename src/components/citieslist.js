import React from 'react';
import CityList from './citylist.js';
import eliminateCityDupes from '../utils/eliminatecitydupes.js';
import buildAlphaStationsObj from '../utils/buildalphastationsobj.js';
import AlphaListSection from './alphalistsection.js';


// Returns a list of cities that match the search criteria. The city names are links the station info for that city.
// If there are multiple stations in a city, the city name will link to the first station in that city that
// matches the search criteria (the other stations in that city will be noted and linked to on the station's page).
// I could have listed cities multiple times or linked to the city disambiguation page instead, but this seemed like
// in could be confusing to users. Also, if search results contian 10 or more cities then the results will have a
// heading breaking the results by first letter.
function CitiesList(props) {

  // Returns only one station per city
  const deDupedMatches = eliminateCityDupes(props.matches);

  if (deDupedMatches.length >= 10) {

    // Object with stations broken up by first letter.
    // ex: {a: [station1, staion2], d: [station1], etc.}
    const alphaStationsObj = buildAlphaStationsObj(deDupedMatches);

    return (
      <div>
        {Object.keys(alphaStationsObj).map(letter => (
          <AlphaListSection
            key={letter}
            letter={letter}
            stations={alphaStationsObj[letter]}
            isActive={props.isActive}
            weatherValues={props.weatherValues}
          />
        ))}
      </div>
    );
  } else {

    return (
      <div>
        <ul>
        {deDupedMatches.map(station => (
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
}

export default CitiesList;
