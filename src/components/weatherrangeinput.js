import React from 'react';
import '../css/weatherrangeinput.css';

// Component for a range input slider inside of a form. Min and max should come from minmax.json
// function WeatherRangeInput(props) {
function WeatherRangeInput(props) {

  // Below is used to calculate width for the fake slider fill.
  const range = props.max - props.min;
  const distFromMin = props.value - props.min;
  const percentage = distFromMin * 100 / range;
  const fillValue = percentage + "%";
  const widthStyle = { width: fillValue };

  return (
    <div className="WeatherRangeInput">
      <label htmlFor={props.id}>{props.label}</label>
      <div className="outer-container">
        <div className="inner-container" style={widthStyle}></div>
        <div className="inner-container2"></div>
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


// Good/old july 1:
// function WeatherRangeInput(props) {
//
//   return (
//     <div className="WeatherRangeInput">
//       <label htmlFor={props.id}>{props.label}</label>
//       <input
//         className="WeatherRangeInput-input"
//         type="range"
//         id={props.id}
//         min={props.min}
//         max={props.max}
//         step="1"
//         value={props.value}
//         onChange={props.onChange}
//       />
//       <div className="WeatherRangeInput-unit-value">
//         <div className="value">{props.value}</div>
//         <div className="unit">{props.unit}</div>
//       </div>
//     </div>
//   );
// }
