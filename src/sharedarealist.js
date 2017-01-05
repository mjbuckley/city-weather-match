import React from 'react';

function SharedAreaList(props) {

  return (
    <div className="SharedAreaList">

    {(props.sharedarea.length < 2) ? (
      <h4>{props.city} is part of the {props.sharedarea[0]} urban area</h4>
    ) : (
      <div>
        <h4>{props.city} is part of the following urban areas:</h4>
        <ul>
        {props.sharedarea.map(area => (
          <li>{area}</li>
        ))
        }
        </ul>
      </div>
    )}

    </div>
  );
}

export default SharedAreaList;
