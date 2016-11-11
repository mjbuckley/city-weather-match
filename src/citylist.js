import React from 'react';
import SharedAreaList from './sharedarealist';


function CityList(props) {

  return (
    <li key={props.station} className="CityList">
      <a>{props.city}, {props.state}</a>
      <div>
        <p>Some test text</p>
        {(props.sharedarea.length > 0) ? (
          <SharedAreaList sharedarea={props.sharedarea} />
        ) : null }
      </div>

    </li>
  );
}

export default CityList;
