import React, { Component } from 'react';
import WeatherContext from './weathercontext.js';
import '../css/slidergroup.css';

const inputMinMax = require('../data/inputminmax.json');


// Component holds related sliders for each type of weather value. In general, this means the min
// and the max sliders, but for those weather values with only a min or max then it will just hold
// one slider. Takes 4 props: updateSliderState (function defined in Search
// that updates slider state in Search), name (the generalized name of the weather value the sliders are
// for. That is the value in weather.json. Ex: 'andTmnLe32' not 'andTmnLe32Ge'), unit (F, days, etc.),
// and legend (Text to appear describing slider(s)).
class SliderGroup extends Component {
  constructor() {
    super();
    this.state = {
      showContext: false,
      isNotImportant:false
    };
    this.handleShowContext = this.handleShowContext.bind(this);
    this.handleIsNotImportant = this.handleIsNotImportant.bind(this);
  }

  handleShowContext(evt) {
    const newState = evt.target.checked ? {showContext: true} : {showContext: false};
    this.setState(newState);
  }

  handleIsNotImportant(evt) {
    if (evt.target.checked) {

      this.setState({isNotImportant: true});

      // Determine what sliders need their state updated and then do so.
      const name = this.props.name;

      if (name.charAt(0) === "a") {
        this.props.updateSliderState({
          [name + "Ge"]: inputMinMax[name + "Ge"][0],
          [name + "Le"]: inputMinMax[name + "Le"][1]
        });
      } else if (name.charAt(3) === "x") {
        this.props.updateSliderState({hMTmxAvLe: inputMinMax["hMTmxAvLe"][1]});
      } else {
        this.props.updateSliderState({lMTmnAvGe: inputMinMax["lMTmnAvGe"][0]});
      }
    } else {
      this.setState({isNotImportant: false});
    }
  }

  render() {
    return (
      <fieldset className="slider-group">

        <legend>{this.props.legend}</legend>

        <label className="slider-group-label">
          Not Important:
          <input
            name={this.props.name}
            type="checkbox"
            checked={this.state.isNotImportant}
            onChange={this.handleIsNotImportant}
           />
        </label>

        <div style={(this.state.isNotImportant) ? {display: "none"} : {display: "block"}}>

          <label className="slider-group-label">
            Show Context:
            <input
              name="showContext"
              type="checkbox"
              checked={this.state.showContext}
              onChange={this.handleShowContext}
             />
          </label>

          <WeatherContext name={this.props.name} clicked={this.state.showContext} unit={this.props.unit} />

          {this.props.children}

        </div>
      </fieldset>
    );
  }
}

export default SliderGroup;
