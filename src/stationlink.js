import React from 'react';
import { Link } from 'react-router';
import buildLink from './buildlink.js';

// Given a station id, retrun an li element that 1) links to the station's page (with correct query params
// if needed), 2) lists the station's city name as the link text, and 3) include a className indictating
// if the station is in props.matches or not (and not if !isActive).
function StationLink(props) {

  const path ="/location/" + encodeURIComponent(props.city) + "/" + encodeURIComponent(props.state) + "/" + encodeURIComponent(props.station);
  const link = buildLink(props, path);
  const matchClass = props.isActive && props.matches.includes(props.station) ? "match" : "not-match";

  return (
    <li className={matchClass}>
      <Link to={link}>Station {props.station}</Link>
    </li>
  );
}

export default StationLink;
