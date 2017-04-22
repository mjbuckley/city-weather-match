import React, { Component } from 'react';
import { Link } from 'react-router';
import paramsToValues from './utils/paramstovalues.js';
import findMatches from './utils/findmatches.js';
import paramsMatchState from './utils/paramsmatchstate.js';
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
      andSnCGe1: weatherConst["andSnCGe1"][2],
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
    // false. If empty but isActiveis true then set it to false.
    if (this.props.location.query.length === 0) {

      if (this.state.isActive === true) {
        this.updateWeatherState({isActive: false});
      }

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
    let info = paramsToValues(this.props);

    // info["isActive"] is only true if paramsToValues returns a complete/valid set of weather values.
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
    // false. If empty but isActiveis true then set it to false.
    if (nextProps.location.query.length === 0) {

      if (this.state.isActive === true) {
        this.updateWeatherState({isActive: false});
      }

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
    let info = paramsToValues(nextProps);

    // info["isActive"] is only true if paramsToValues returns a complete/valid set of weather values.
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
      <div className="app">
        <div className="app-header-wrapper">
          <header className="app-header">
            <h1><Link to="/">City Weather App</Link></h1>
          </header>
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
            andSnCGe1: this.state.andSnCGe1,
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
