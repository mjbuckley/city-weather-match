import React from 'react';

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
    id=Ex: "maxTemp"
    description=What the slider is for. Ex: "Max number of days above 90"
    min=Min possible value. Ex. {weatherConst.maxTemp[0]}
    max=Max possible value. Ex: {weatherConst.maxTemp[1]}
    value=The current state. Ex: {this.state.maxTemp}
    onChange=Function to change the state. Ex: {this.state.changeMaxTemp}
    output=Optional. Include if unit needed. Ex: "°F"
  />

  // weatherConst will be an array (maybe an obj instead?) with all of the min and max values.
  // I will set this up to be auto generated when I created the weather.json file.
  // Example format below:

  const weatherConst = [ {maxTemp: [30, 130]}, {snow: [0, 300]} ];

*/

export default WeatherRangeInput;
