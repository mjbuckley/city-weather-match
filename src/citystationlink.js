import buildLink from './buildlink.js';

const stationsObj = require('./data/weather.json');

// Given a station id, retrun an li element that 1) links to the station's page (with correct query params
// if needed), 2) lists the station's city name as the link text, and 3) include a className indictating
// if the station is in props.matches or not (and not if !isActive).
function CityStationLink(props) {

  const city = stationsObj[props.station]["city"];
  const state = stationsObj[props.station]["state"];
  const path ="/location/" + encodeURIComponent(city) + "/" + encodeURIComponent(state) + "/" + encodeURIComponent(props.station);
  const link = buildLink(props, path);
  const matchClass = props.isActive && props.matches.includes(station) ? "match" : "not-match";

  return (
    <li className{matchClass}>
      <Link to={link}>{city}</Link>
    </li>
  );
}

export default CityStationLink;
