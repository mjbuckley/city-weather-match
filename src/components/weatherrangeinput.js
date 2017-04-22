import React from 'react';
import '../css/weatherrangeinput.css';

// Component for a range input slider inside of a form. Min and max should come from minmax.json
// function WeatherRangeInput(props) {
function WeatherRangeInput(props) {
  return (
    <div>
      <label htmlFor={props.id}>{props.description}</label>
      <br />
      <div className="WeatherRangeInput-input-wrap">
        <input
          className="WeatherRangeInput-input"
          type="range"
          id={props.id}
          min={props.min}
          max={props.max}
          step="1"
          value={props.value}
          onChange={props.onChange}
        />
        <div className="WeatherRangeInput-unit-value">
          {props.value + (props.unit ? (" " + props.unit) : "")}
        </div>
      </div>
    </div>
  );
}

export default WeatherRangeInput;
