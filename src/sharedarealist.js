import React from 'react';
import { Link } from 'react-router'
import buildParams from './buildparams.js';


// Need to figure out the metro area disambiguation page and decide what props to pass there.
// Also need to figure out how to deal with metro areas with the same name (ex: Columbus).
// Iniitial test version. Eventually need to link to metro area disambiguation page.
function SharedAreaList(props) {

  if (props.sharedarea.length > 1) {

    return (
      <div className="SharedAreaList">
        <h4>{props.city} is part of the following urban areas:</h4>
        <ul>
          {props.sharedarea.map(function(area, index) {
            const path = "/metro-areas/" + encodeURIComponent(area);
            const query = buildParams(props);
            const link = {
              pathname: path,
              query: query
            };
            return (<li key={index}><Link to={link}>{area}</Link></li>);
            }
          )}
        </ul>
      </div>
    );
  } else {
    const path = "/metro-areas/" + encodeURIComponent(props.sharedarea[0]);
    const query = buildParams(props);
    const link = {
      pathname: path,
      query: query
    };
    return (
      <div className="SharedAreaList">
        <h4>{props.city} is part of the <Link to={link}>{props.sharedarea[0]}</Link> urban area</h4>
      </div>
    );
  }
}

export default SharedAreaList;
