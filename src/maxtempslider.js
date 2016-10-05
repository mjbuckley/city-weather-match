import React from 'react';
import './weatherinfo.css';

function MaxTempSlider(props) {
  return (
    <div>
      <label htmlFor="maxtemp">Average high temperature in July is less than:</label>
      <br />
      <input
        type="range"
        id="maxtemp"
        min="30" max="130"
        step="1"
        value={props.value}
        onChange={props.onChange}
      />
      <span>{props.value} °F</span>
    </div>
  );
}

export default MaxTempSlider;
