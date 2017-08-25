import React, { Component } from 'react';
import WeatherContext from './weathercontext.js';
// import '../css/slidergroup.css';

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
      <fieldset>

        <legend>{this.props.legend}</legend>

        <label>
          Not Important:
          <input
            name={this.props.name}
            type="checkbox"
            checked={this.state.isNotImportant}
            onChange={this.handleIsNotImportant}
           />
        </label>

        <div style={(this.state.isNotImportant) ? {display: "none"} : {display: "block"}}>

          <label>
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






// // NOT SURE IF I NEED ANY OF THE STUFF BELOW. CHECK AND SEE.
//
//
// // Min, max, and midway possible values for each weather category.
// const inputMinMax = require('../data/inputminmax.json');
//
// function shouldBeClicked(name, opposite, value) {
//
//   // If name starts with "a" then that value has a min/max opposite and thus the potential
//   // for needing to be clicked.
//   if (name.charAt(0) === "a" && (inputMinMax[name][0] === value || inputMinMax[name][1] === value)) {
//
//     if (name.charAt(name.lenght - 2) === "G") {
//       const opposite = name.slice(0, -2) + "Le";
//       this.state[opposite]
//     } else {
//       const opposite = name.slice(0, -2) + "Ge";
//       this.state[opposite]
//     }
//   }
// }
//
//
//
//
// const name = evt.target.name;
// const value = parseInt(evt.target.value);
//
//
// // Given a valid weather name, this will return the min/max opposite if it exists, or else
// // it will return false if non exists.
// function findOpposite(name) {
//
//   // Only names starting with "a" have a min/max opposite.
//   if (name.charAt(0) === "a") {
//
//     if (name.charAt(name.lenght - 2) === "G") {
//       const opposite = name.slice(0, -2) + "Le";
//       return opposite;
//     } else {
//       const opposite = name.slice(0, -2) + "Ge";
//       return opposite;
//     }
//   } else {
//     return false;
//   }
// }
//
//
//
// // TEST NEW VERSION OF changeSliderValue
//
// const name = evt.target.name;
// const label = evt.target.lable;
// const value = parseInt(evt.target.value);
//
// if (name.charAt(0) === "a" && sliderAtExtreme(name, label, value)) {
//
//
// } else {
//   // just update slider value
// }
//
//   if (evt.target.label === "AT LEAST") {
//
//     const min = evt.target.value;
//     const opposite = name.slice(0, -2) + "Le";
//     const max = this.state[opposite];
//
//   }
//
//
// function sliderAtExtreme(name, label, value) {
//
//   if (label === "AT LEAST") {
//     return (inputMinMax[name][0] === value);
//   } else {
//     return (inputMinMax[name][1] === value);
//   }
// }
//
// // probably could rewrite as follows:
// (label === "AT LEAST") ? (inputMinMax[name][0] === value) : (inputMinMax[name][1] === value);
//
//
//
//
// // OLD FROM search
//
// // STILL NEED TO FIGURE OUT HOW TO REMOVE CHECK WHEN THE SLIDER IS MOVED (or I need to disable the slider
// // until unchecked.)
// // this is a hacky solution that works fine for now, but could be problematic if I change my weather
// // value naming or add new data. Eventually I should improve this section.
//
// // "checked" is a valid html attribute (it is given no value, just "checked"). When present it makes the
// // default value of the checkbox be checked. After that it has no effect on things. As best as I can
// // tell, React allows you to provide a checked={some T/F state condition} attribute to an input element.
// // Then create a handleClick function that toggles that state value based on event click status. The state // change causes the click button to rerender, with the state value being used to set the default click
// // status. (In some cases, if default is unchecked then it might be possible to ignore state altogether
// // and just look at evt.target.checked in handleClick, but I would worry about anything that could causes
// // the input to rerender and how that might change clicked value. Better to have it be a controlled
// // component handled by state).
// handleShowContext(evt) {
//
//   if (evt.target.checked === true) {
//
//     // still need to add check for and handle other possibilities.
//     const input = evt.target.name;
//
//     if (input.charAt(0) === "a") {
//       const low = input + "Ge";
//
//       const high = input + "Le";
//       const lowValue = inputMinMax[low][0];
//       const highValue = inputMinMax[high][1];
//
//       this.setState({
//         [input]: true,
//         [low]: lowValue,
//         [high]: highValue
//       });
//     }
//
//   } else { // just need to change checked to false, all other stuff can stay the same
//     this.setState({
//       [evt.target.name]: false
//     });
//   }
// }
//
//
// // No longer think I need this, but keeping temporarily in case I do
// // converts prop name (from slider name) to useable name to get weather value
// // Note that this works for all current names, but if I change nameing schemes or adding different
// // types of names then this will no longer work.
// // const weatherOption = (prop.name.charAt(0) === "a") : (props.name.slice(-2)) ? ("m" + props.name.slice(2,7));
