import React from 'react';
import './css/weatherrangeinput.css';

// Component for a range input slider inside of a form. Min and max should come from minmax.json
function WeatherRangeInput(props) {
  return (
    <div>
      <label htmlFor={props.id}>{props.description}</label>
      <br />
      <input
        type="range"
        id={props.id}
        min={props.min}
        max={props.max}
        step="1"
        value={props.value}
        onChange={props.onChange}
      />
      <span>{props.value + (props.unit ? (" " + props.unit) : "") }</span>
    </div>
  );
}

export default WeatherRangeInput;
