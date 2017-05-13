import React from 'react';
import CityList from './citylist.js';
import eliminateCityDupes from '../utils/eliminatecitydupes.js';

// Returns a list of cities that match the search criteria. The city names are links the station info for that city.
// If there are multiple stations in a city, the city name will link to the first station in that city that
// matches the search criteria (the other stations in that city will be noted and linked to on the station's page).
// I could have listed cities multiple times or linked to the city disambiguation page instead, but this seemed like
// in could be confusing to users.
function CitiesList(props) {

  const deDupedMatches = eliminateCityDupes(props.matches);

  return (
    <div>
      <ul>
      {deDupedMatches.map(station => (
        <CityList
          key={station}
          station={station}
          weatherValues={props.weatherValues}
          matches={props.matches}
          isActive={props.isActive}
        />
      ))}
      </ul>
    </div>
  );
}

export default CitiesList;
