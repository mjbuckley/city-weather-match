import React, { Component } from 'react';
import { Link } from 'react-router';
import validQueryParams from './validqueryparams.js';
import findMatches from './findmatches.js';
import checkParamsChange from './checkparamschange.js';
import weatherOptions from './data/weatheroptions.js';
import './css/App.css';

// Min, max, and midway values for each weather category
const weatherConst = require('./data/minmax.json');

class App extends Component {
  constructor() {
    super();
    // Weather values are set to the midway point between min and max possible values
    this.state = {
      maxTemp: weatherConst["mlyTMaxAvg"][2],
      lowTemp: weatherConst["mlyTMinAvg"][2],
      snowfall: weatherConst["annInchPlus"][2],
      precip: weatherConst["annprcpge050hi"][2],
      below32: weatherConst["daysBelow32"][2],
      matches: [],
      clicked: false
    };
    this.updateWeatherState = this.updateWeatherState.bind(this);
  }


  // On App mount this checks query param values against values in state and then updates state if needed.
  componentWillMount() {

    // If query params are present/valid, info is an object with all weather values present and clicked set
    // to true. If not present/invalid, info is an object with only one property, clicked, which is set to false.
    let info = validQueryParams(this.props);

    // Clicked will only be true if all values valid/present
    if (info["clicked"] === true) {

      // Compare info values to state values. Set mismatch to true if there is a difference between the two,
      // set to false if they are the same. I don't love the way I have this set up, but it works. This SECTION
      // could probably be extracted into it's own function if I want to.
      let mismatch = false;

      weatherOptions.forEach(function(option) {
        if (info[option] !== this.state[option]) {
          mismatch = true;
        }
      });

      // Calculate matches mismatch is true or if state's click value is false. Checking click covers the
      // possibility that state and info match but matches haven't been calculated (rare but possible, such as if
      // on initial load the query params matched the default state values). This might cause a recalculation to
      // happen unneccesarily, but this is probably the simplest way to structure things.
      if (mismatch || this.state.clicked === false) {

        const matches = findMatches(info);
        info["matches"] = matches;

        this.updateWeatherState(info);
      } // else nothing: query params match current state, no need to do anything.

    // Clicked is set to false, meaning the query params were either not present or not valid.
    } else {

      if (this.state.clicked === true) {

        // update state so that clicked is set to false.
        this.updateWeatherState(info);
      } // else nothing: state is as it should be.
    }
  }


  // Watch for query param changes and update state as needed.
  componentWillReceiveProps(nextProps) {

    // function returns true if new query params differ from values in state, false otherwise.
    if (checkParamsChange(nextProps, this.state)) {

      // If query params are present/valid, info is an object with all weather values present and clicked set
      // to true. If not present/invalid, info is an object with only one property, clicked, which is set to false.
      let info = validQueryParams(this.props);

      // Clicked will only be true if all values valid/present
      if (info["clicked"] === true) {

        const matches = findMatches(info);
        info["matches"] = matches;

        this.updateWeatherState(info);

      // Clicked is set to false, meaning the query params were either not present or not valid.
      } else {

        if (this.state.clicked === true) {

          // update state so that clicked is set to false.
          this.updateWeatherState(info);
        } // else nothing: state is as it should be.
      }
    } // else nothing: no changes to query params
  }


  // Function takes an info object with weather values { maxTemp: 100, lowTemp: 30, etc. }
  // and updates state with new info.
  updateWeatherState(info) {
    this.setState(info);
  };


  render() {
    return (
      <div className="App">
        <div>
          <h1><Link to="/">A navbar heading will go here</Link></h1>
        </div>

        {/* Because children of App are added in index.js by React Router, there is no good way to
          pass state values down as props to children. This is a workaround that clones children of
          App and adds needed props here. Looks funny but works fine. I'm not sure if there's
          a way to selectively pass on props depending on the child component, so all direct
          children will get all props right now. */}
        {React.Children.map(
          this.props.children,
          child => React.cloneElement(child,
          {
            maxTemp: this.state.maxTemp,
            lowTemp: this.state.lowTemp,
            snowfall: this.state.snowfall,
            precip: this.state.precip,
            below32: this.state.below32,
            matches: this.state.matches,
            clicked: this.state.clicked,
            updateWeatherState: this.updateWeatherState
          })
        )}

      </div>
    );
  }
}

export default App;
