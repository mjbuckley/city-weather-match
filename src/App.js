import React, { Component } from 'react';
import { Link } from 'react-router';
import validQueryParams from './validqueryparams.js';
import findMatches from './findmatches.js';
import checkParamsChange from './checkparamschange.js';
import paramsMatchState from './paramsmatchstate.js';
import './css/App.css';

// Min, max, and midway values for each weather category
const weatherConst = require('./data/minmax.json');

class App extends Component {
  constructor() {
    super();
    // Weather values are set to the midway point between min and max possible values
    this.state = {
      mTmxAv: weatherConst["mTmxAv"][2],
      mTmnAv: weatherConst["mTmnAv"][2],
      andSnGe1: weatherConst["andSnGe1"][2],
      andPrGe5Ti: weatherConst["andPrGe5Ti"][2],
      andTmnLe32: weatherConst["andTmnLe32"][2],
      matches: [],
      clicked: false
    };
    this.updateWeatherState = this.updateWeatherState.bind(this);
  }


  // On App mount this checks query param values against values in state and then updates state if needed.
  componentWillMount() {

    // If query params are present/valid, this returns an info object with all weather values present and clicked set
    // to true. If not present/invalid, info is an object with only one property, clicked, which is set to false.
    let info = validQueryParams(this.props);

    // Clicked will only be true if all values valid/present
    if (info["clicked"] === true) {

      // Compares info and state's weather values. Returns true if there is a difference, false if the same.
      const mismatch = checkParamsChange(info, this.state);

      // If state and info values differ, calculate matches and update state. Also do this if state's clicked value
      // is false (This covers the rare possibility that state and info weather values match but state's matches haven't been
      // calculated yet, such as if on initial load the query params matched the default state values. Doing this might
      // cause a recalculation to happen unneccesarily, but it prevents this possible error).
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


  // Watch for query param changes and update state as needed. This is needed because React Router does not treat
  // a change in query params as a reload of a page, just as the passing in of new props.
  componentWillReceiveProps(nextProps) {
    console.log("receiving props");
    console.log(nextProps);
    // Query params match state. Do nothing.
    if (paramsMatchState(nextProps, this.state) && this.state.clicked === true) {
      return;
    }

    // No query params, but this.state.clicked is false so this is a match. Do nothing.
    if ((nextProps.location.query.length === 0) && this.state.clicked === false) {
      return;
    }


    // Query param and state values differ. Calculate new values

    // If query params are present/valid, info is an object with all weather values present and clicked set
    // to true. If not present/invalid, info is an object with only one property, clicked, which is set to false.
    let info = validQueryParams(nextProps);

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
  }


  // Function expects an object with valid weather values ex: {mTmxAv: 100}.
  updateWeatherState(info) {
    this.setState(info);
  };


  render() {
    return (
      <div className="App">
        <div>
          <h1><Link to="/">A navbar heading will go here</Link></h1>
        </div>

        {/* Because children of App are added in index.js by React Router, I cannot find a good way to
          pass App's state values as props down to its children. This is a workaround that clones children of
          App and adds needed props here. It would be nice to find a better way to do this, but it works fine.
          This method passes down some props that some children won't need. There is no problem with this right now
          but would prefer something that didn't do this. */}
        {React.Children.map(
          this.props.children,
          child => React.cloneElement(child,
          {
            mTmxAv: this.state.mTmxAv,
            mTmnAv: this.state.mTmnAv,
            andSnGe1: this.state.andSnGe1,
            andPrGe5Ti: this.state.andPrGe5Ti,
            andTmnLe32: this.state.andTmnLe32,
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
