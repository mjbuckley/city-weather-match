import React from 'react';
import '../css/weatherrangeinput.css';

// Component for a range input slider inside of a form. Min and max should come from minmax.json
// function WeatherRangeInput(props) {
function WeatherRangeInput(props) {

  return (
    <div className="WeatherRangeInput">
      <label htmlFor={props.id}>{props.label}</label>
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
        <div className="value">{props.value}</div>
        <div className="unit">{props.unit}</div>
      </div>
    </div>
  );
}

export default WeatherRangeInput;


// import React from 'react';
// import '../css/weatherrangeinput.css';
//
// // Component for a range input slider inside of a form. Min and max should come from minmax.json
// // function WeatherRangeInput(props) {
// function WeatherRangeInput(props) {
//
//   return (
//     <div className="WeatherRangeInput">
//       <label className="WeatherRangeInput-label" htmlFor={props.id}>{props.description}</label>
//       <div className="WeatherRangeInput-input-wrap">
//         <span>At Least:</span>
//         <input
//           className="WeatherRangeInput-input"
//           type="range"
//           id={props.id}
//           min={props.min}
//           max={props.max}
//           step="1"
//           value={props.value}
//           onChange={props.onChange}
//         />
//         <div className="WeatherRangeInput-unit-value">
//           {props.value}<span>{(props.unit ? (" " + props.unit) : "")}</span>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default WeatherRangeInput;
