import React from 'react';
import './weatherinfo.css'; // See if needed, if yes change name

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

/*

  // Example useage in weatherinfo.js
  <WeatherRangeInput
    id="maxTemp"
    description="This is the description"
    min={weatherConst.maxTemp[0]}
    max={weatherConst.maxTemp[1]}
    value={this.state.maxTemp}
    onChange={this.state.changeMaxTemp}
    output="°F"
  />

  // weatherConst will be an array (maybe an obj instead?) with all of the min and max values.
  // I will set this up to be auto generated when I created the weather.json file.
  // Example format below:

  const weatherConst = [ {maxTemp: [30, 130]}, {snow: [0, 300]} ];

*/

export default WeatherRangeInput;
