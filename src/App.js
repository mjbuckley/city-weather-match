import React, { Component } from 'react';
import { Link } from 'react-router';
import validQueryParams from './validqueryparams.js';
import findMatches from './findmatches.js';
import checkParamsChange from './checkparamschange.js';
import paramsMatchState from './paramsmatchstate.js';
import './css/App.css';

// Min, max, and midway values for each weather category
const weatherConst = require('./data/minmax.json');

// Precomputed station matches for the default weather values
const defaultMatches = require('./data/defaultmatches.json');

class App extends Component {
  constructor() {
    super();
    // Weather values are set to the midway point between min and max possible values
    // Matches is set manually. BE SURE TO UPDATE MATCHES EVERY TIME I ADD WEATHER OPTIONS
    // OR UPDATE THE DATA.
    this.state = {
      mTmxAv: weatherConst["mTmxAv"][2],
      mTmnAv: weatherConst["mTmnAv"][2],
      andSnGe1: weatherConst["andSnGe1"][2],
      andPrGe5Ti: weatherConst["andPrGe5Ti"][2],
      andTmnLe32: weatherConst["andTmnLe32"][2],
      matches: defaultMatches["defaultMatches"],
      isActive: false
    };
    this.updateWeatherState = this.updateWeatherState.bind(this);
  }


  // On App mount this checks query param values against values in state and then updates state if needed.
  // Note that this code is the same as in componentWillReceiveProps except this.props is used instead of nextProps.
  componentWillMount() {

    // Empty query params signify that isActive should be false, so do nothing if they are empty and isActive is set to
    // false (validQueryParams below would handle this situation, but it's more clear/probably faster to handle here)
    if ((this.props.location.query.length === 0) && this.state.isActive === false) {
      return;
    }

    // If query params match state, no need to change weather values, but change isActive to true if currently false.
    if (paramsMatchState(this.props.location.query, this.state)) {

      if (this.state.isActive === false) {
        this.updateWeatherState({isActive: true});
      }

      return;
    }

    // If we get here, query params are present and don't match state. See if they are valid then handle.
    let info = validQueryParams(this.props);

    // info["isActive"] is only true if validQueryParams returns a complete/valid set of weather values.
    if (info["isActive"] === true) {

      const matches = findMatches(info);
      info["matches"] = matches;

      this.updateWeatherState(info);

    // Invalid query params, so can't update weather values. Make sure isActive is set to false.
    } else {

      if (this.state.isActive === true) {

        this.updateWeatherState({isActive: false});
      } // else nothing: state is already set to false.
    }
  }


  // Watch for query param changes and update state as needed. This is needed because React Router does not treat
  // a change in query params as a reload of a page, just as the passing in of new props.
  // Note that this code is the same as in componentWillMount except nextProps is used instead of this.props.
  componentWillReceiveProps(nextProps) {

    // Empty query params signify that isActive should be false, so do nothing if they are empty and isActive is set to
    // false (validQueryParams below would handle this situation, but it's more clear/probably faster to handle here)
    if ((nextProps.location.query.length === 0) && this.state.isActive === false) {
      return;
    }

    // If query params match state, no need to change weather values, but change isActive to true if currently false.
    if (paramsMatchState(nextProps.location.query, this.state)) {

      if (this.state.isActive === false) {
        this.updateWeatherState({isActive: true});
      }

      return;
    }

    // If we get here, query params are present and don't match state. See if they are valid then handle.
    let info = validQueryParams(nextProps);

    // info["isActive"] is only true if validQueryParams returns a complete/valid set of weather values.
    if (info["isActive"] === true) {

      const matches = findMatches(info);
      info["matches"] = matches;

      this.updateWeatherState(info);

    // Invalid query params, so can't update weather values. Make sure isActive is set to false.
    } else {

      if (this.state.isActive === true) {

        this.updateWeatherState({isActive: false});
      } // else nothing: state is already set to false.
    }
  }


  // Function expects an object with valid weather values ex: {mTmxAv: 100}.
  updateWeatherState(info) {
    this.setState(info);
  };


  render() {
    return (
      <div className="App">
      {console.log(this.state.matches)}
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
            isActive: this.state.isActive,
            updateWeatherState: this.updateWeatherState
          })
        )}

      </div>
    );
  }
}

export default App;


// 3/15/17 good version

// componentWillMount() {
//
//   // If this.state.isActive is false, then empty query params are actually a kind of match. In that case, do
//   // nothing and return (code below would handle this situation, but it's more clear/probably faster to handle here)
//   if ((this.props.location.query.length === 0) && this.state.isActive === false) {
//     return;
//   }
//
//   // If query params match state, no need to recalculate anything. Values in state are always complete/valid.
//   // If isActive is false change to true, but otherwise do nothing.
//   if (paramsMatchState(this.props, this.state)) {
//
//     if (this.state.isActive === false) {
//       this.updateWeatherState({isActive: true});
//     }
//
//     return;
//   }
//
//   // If we get here, query params are present and don't match state. See if they are valid then decide how to
//   // handle. If valid info object below will have all weather values and isActive set to true. If invalid it
//   // will have just one property, isActive, which willl be set to false.
//   let info = validQueryParams(this.props);
//
//   // Valid/complete query params (isActive will only be true if all values valid/present)
//   if (info["isActive"] === true) {
//
//     const matches = findMatches(info);
//     info["matches"] = matches;
//
//     this.updateWeatherState(info);
//
//   // Invalid/empty query params, so can't update weather values. Make sure isActive is set to false.
//   } else {
//
//     if (this.state.isActive === true) {
//
//       this.updateWeatherState(info);
//     } // else nothing: state is already set to false.
//   }
// }


// 3/14/17 good version
// componentWillReceiveProps(nextProps) {
//
//   // Params match state. Do nothing.
//   if (paramsMatchState(nextProps, this.state) && (this.state.isActive === true)) {
//     return;
//   }
//
//   // No query params, but this.state.isActive is false so this is a match. Do nothing.
//   if ((nextProps.location.query.length === 0) && this.state.isActive === false) {
//     return;
//   }
//
//   // Query param and state values differ. Calculate new values
//
//   // If query params are present/valid, info is an object with all weather values present and isActive set
//   // to true. If not present/invalid, info is an object with only one property, isActive, which is set to false.
//   let info = validQueryParams(nextProps);
//
//   // isActive will only be true if all values valid/present
//   if (info["isActive"] === true) {
//
//     const matches = findMatches(info);
//     info["matches"] = matches;
//
//     this.updateWeatherState(info);
//
//   // isActive is set to false, meaning the query params were either not present or not valid.
//   } else {
//
//     if (this.state.isActive === true) {
//
//       // update state so that isActive is set to false.
//       this.updateWeatherState(info);
//     } // else nothing: state is as it should be.
//   }
// }



// componentWillMount 3/14/17 good

// componentWillMount() {
//
//   // If query params are present/valid, this returns an info object with all weather values present and isActive set
//   // to true. If not present/invalid, info is an object with only one property, isActive, which is set to false.
//   let info = validQueryParams(this.props);
//
//   // isActive will only be true if all values valid/present
//   if (info["isActive"] === true) {
//
//     // Compares info and state's weather values. Returns true if there is a difference, false if the same.
//     const mismatch = checkParamsChange(info, this.state);
//
//     // If state and info values differ, calculate matches and update state. Also do this if state's isActive value
//     // is false (This covers the rare possibility that state and info weather values match but state's matches haven't been
//     // calculated yet, such as if on initial load the query params matched the default state values. Doing this might
//     // cause a recalculation to happen unneccesarily, but it prevents this possible error).
//     if (mismatch || this.state.isActive === false) {
//
//       const matches = findMatches(info);
//       info["matches"] = matches;
//
//       this.updateWeatherState(info);
//     } // else nothing: query params match current state, no need to do anything.
//
//   // isActive is set to false, meaning the query params were either not present or not valid.
//   } else {
//
//     if (this.state.isActive === true) {
//
//       // update state so that isActive is set to false.
//       this.updateWeatherState(info);
//     } // else nothing: state is as it should be.
//   }
// }
