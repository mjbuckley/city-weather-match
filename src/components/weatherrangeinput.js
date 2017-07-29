import React from 'react';
import '../css/weatherrangeinput.css';

// Component for a range input slider inside of a form. Min and max should come from minmax.json
// function WeatherRangeInput(props) {
function WeatherRangeInput(props) {

  // Calculate width for the left slider fill.
  const range = props.max - props.min;
  const distFromMin = props.value - props.min;
  const percentage = distFromMin * 100 / range;
  const fillValue = percentage + "%";

  // Determine whether to fill from right or left
  const leftColor = (props.label === "AT LEAST") ? "#9e9e9e" : "rgba(207, 207, 207, 1)";
  const rightColor = (props.label === "AT LEAST") ? "rgba(207, 207, 207, 1)" : "#9e9e9e";


  // Inline styles to be applied
  const leftStyle = { width: fillValue, backgroundColor: leftColor };
  const rightStyle = { backgroundColor: rightColor };

  return (
    <div className="WeatherRangeInput">
      <label htmlFor={props.id}>{props.label}</label>
      <div className="slider-container">
        <div className="left-fill" style={leftStyle}></div>
        <div className="right-fill" style={rightStyle}></div>
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
      </div>
      <div className="WeatherRangeInput-unit-value">
        <div className="value">{props.value}</div>
        <div className="unit">{props.unit}</div>
      </div>
    </div>
  );
}

export default WeatherRangeInput;
