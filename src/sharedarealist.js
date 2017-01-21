import React from 'react';

// Iniitial test version. Eventually need to link to metro area disambiguation page.
function SharedAreaList(props) {

  return (
    <div className="SharedAreaList">

      {(props.sharedarea.length > 1) ? (
        <div>
          <h4>{props.city} is part of the following urban areas:</h4>
          <ul>
            {props.sharedarea.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h4>{props.city} is part of the {props.sharedarea[0]} urban area</h4>
        </div>
      )}

    </div>
  );
}

export default SharedAreaList;
