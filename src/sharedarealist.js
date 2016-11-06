import React from 'react';

function SharedAreaList(props) {

  return (
    <div className="SharedAreaList">
      <ul>
      {props.sharedarea.map(area => (
        <li>{area}</li>
      ))
      }
      </ul>
    </div>
  );
}

export default SharedAreaList;
