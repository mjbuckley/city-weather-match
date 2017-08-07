import React, { Component } from 'react';
import { Link } from 'react-router';
import paramsToValues from './utils/paramstovalues.js';
import findMatches from './utils/findmatches.js';
import paramsMatchState from './utils/paramsmatchstate.js';
import buildLink from './utils/buildlink.js';
import './css/App.css';

// Min, max, and midway values for each weather input category
const inputMinMax = require('./data/inputminmax.json');

// Precomputed station matches for the default weather values
const defaultMatches = require('./data/defaultmatches.json');

class App extends Component {
  constructor() {
    super();
    // Properties in weatherValues are set to the midway point between min and max possible values
    // Default matches are precomputed in jsoncreate.js and copied over.
    this.state = {
      weatherValues: {
        hMTmxAvLe: inputMinMax["hMTmxAvLe"][2],
        lMTmnAvGe: inputMinMax["lMTmnAvGe"][2],
        andSnGe1Le: inputMinMax["andSnGe1Le"][2],
        andSnGe1Ge: inputMinMax["andSnGe1Ge"][2],
        andSnCGe1Le: inputMinMax["andSnCGe1Le"][2],
        andSnCGe1Ge: inputMinMax["andSnCGe1Ge"][2],
        andPrGe5TiLe: inputMinMax["andPrGe5TiLe"][2],
        andPrGe5TiGe: inputMinMax["andPrGe5TiGe"][2],
        andTmnLe32Le: inputMinMax["andTmnLe32Le"][2],
        andTmnLe32Ge: inputMinMax["andTmnLe32Ge"][2],
        andTmxGe60Le: inputMinMax["andTmxGe60Le"][2],
        andTmxGe60Ge: inputMinMax["andTmxGe60Ge"][2],
        andTmxGe80Le: inputMinMax["andTmxGe80Le"][2],
        andTmxGe80Ge: inputMinMax["andTmxGe80Ge"][2]
      },
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
    if (Object.keys(this.props.location.query).length === 0) {

      if (this.state.isActive === true) {
        this.updateWeatherState({isActive: false});
      }

      return;
    }

    // If query params match state, no need to change weather values, but change isActive to true if currently false.
    if (paramsMatchState(this.props.location.query, this.state.weatherValues)) {

      if (this.state.isActive === false) {
        this.updateWeatherState({isActive: true});
      }

      return;
    }

    // If we get here, query params are present and don't match state. See if they are valid then handle.
    let info = paramsToValues(this.props);

    // info["isActive"] is only true if paramsToValues returns a complete/valid set of weather values.
    if (info["isActive"] === true) {

      const matches = findMatches(info["weatherValues"]);
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
    if (Object.keys(nextProps.location.query).length === 0) {

      if (this.state.isActive === true) {
        this.updateWeatherState({isActive: false});
      }

      return;
    }


    // If query params match state, no need to change weather values, but change isActive to true if currently false.
    if (paramsMatchState(nextProps.location.query, this.state.weatherValues)) {

      if (this.state.isActive === false) {
        this.updateWeatherState({isActive: true});
      }

      return;
    }

    // If we get here, query params are present and don't match state. See if they are valid then handle.
    let info = paramsToValues(nextProps);

    // info["isActive"] is only true if paramsToValues returns a complete/valid set of weather values.
    if (info["isActive"] === true) {

      const matches = findMatches(info["weatherValues"]);
      info["matches"] = matches;

      this.updateWeatherState(info);

    // Invalid query params, so can't update weather values. Make sure isActive is set to false.
    } else {

      if (this.state.isActive === true) {

        this.updateWeatherState({isActive: false});
      } // else nothing: state is already set to false.
    }
  }


  // Function expects an info object with any/all of the following: weatherValues, matches, and isActive.
  // Note that if updating weatherValues is should contain the full object, not just a property in the object
  // Ex: BAD updateWeatherState({weatherValues.hMTmxAvLe: 100}). DO NOT DO THIS.
  updateWeatherState(info) {
    this.setState(info);
  };


  render() {
    return (
      <div className="app">

        <div className="app-header-wrapper">
          <header className="app-header">
          <h1><Link to={buildLink(this.state, "/")}>City Weather Match</Link></h1>


            <div className="app-header-items">
              {(this.state.isActive) ? (
                <Link to={buildLink(this.state, "/results/")}>Search Results</Link>
              ) : null }

              <Link to={buildLink(this.state, "/search/")}>New Search</Link>
              <Link to={buildLink(this.state, "/about/")}>About</Link>
            </div>

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
            weatherValues: this.state.weatherValues,
            matches: this.state.matches,
            isActive: this.state.isActive
          })
        )}

      </div>
    );
  }
}

export default App;
