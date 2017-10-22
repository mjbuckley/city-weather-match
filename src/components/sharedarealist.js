import React from 'react';
import { Link } from 'react-router'
import buildLink from '../utils/buildlink.js';
import '../css/sharedarealist.css';


// Displays a list of the metro areas that a station is part of.
function SharedAreaList(props) {

  if (props.sharedarea.length > 1) {

    return (
      <div className="SharedAreaList">
        <h4>Other cities in the same metro area</h4>
        <p>{props.city} is part of several metro areas. Click on one of the metro areas below to view the weather info for all of the cities in that metro area with a NOAA weather station.</p>
        <ul>
          {props.sharedarea.map(function(area, index) {
            const path = "/metro-areas/" + encodeURIComponent(area);

            return (<li key={index}><Link to={buildLink(props, path)}>{area}</Link></li>);
            }
          )}
        </ul>
      </div>
    );
  } else {
    const path = "/metro-areas/" + encodeURIComponent(props.sharedarea[0]);
    return (
      <div className="SharedAreaList">
        <h4>Other cities in the same metro area</h4>
        <p>{props.city} is a part of the {props.sharedarea[0]} metro area. <Link to={buildLink(props, path)}>Click to view</Link> weather info for all of the cities in the {props.sharedarea[0]} area with a NOAA weather station.</p>
      </div>
    );
  }
}

export default SharedAreaList;
