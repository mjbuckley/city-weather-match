import React from 'react';
import SharedAreaList from './sharedarealist';


function CityList(props) {
  return (
    <div className="CityList">
      <p>{props.city}, {props.state}</p>
      {(props.sharedarea.length > 0) ? (
        <SharedAreaList sharedarea={props.sharedarea} />
      ) : null }
    </div>
  );
}

export default CityList;
