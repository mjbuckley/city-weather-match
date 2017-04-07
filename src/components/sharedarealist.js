import React from 'react';
import { Link } from 'react-router'
import buildLink from '../utils/buildlink.js';

// Displays a list of the metro areas that a station is part of.
function SharedAreaList(props) {

  if (props.sharedarea.length > 1) {

    return (
      <div className="SharedAreaList">
        <h4>{props.city} is part of the following urban areas:</h4>
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
        <h4>{props.city} is part of the <Link to={buildLink(props, path)}>{props.sharedarea[0]}</Link> urban area</h4>
      </div>
    );
  }
}

export default SharedAreaList;
