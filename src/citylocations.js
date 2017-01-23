import React from 'react';
import { Link } from 'react-router'


// DEAL WITH SPACES IN CITY NAMES (maybe write stand alone function because I'll probably
// use it in many places).
// Deal with jibberish input
function CityLocations(props) {

  const city = props.params.city;
  const state = props.params.state;
  // const stationsObj = props.stationsObj;

  // Find all stations in city
  let locations = [];
  Object.keys(props.stationsObj).forEach(function(station) {
    if ( (props.stationsObj[station]["city"] === city) &&
    (props.stationsObj[station]["state"] === state) ) {
      locations.push(station);
    }
  });

  return (
    <div>

      <h2>{city}, {state}</h2>

      {(locations.length > 1) ? (
        <p>There are several weather stations in {city}.</p>
      ) : null}

      <ul>
        {locations.map(function(station) {
          const link = "/location/" + city + "/" + state + "/" + station;
          return (<li key={station}><Link to={link}>Station {station}</Link></li>);
        })}
      </ul>
    </div>
  );
}

export default CityLocations;
