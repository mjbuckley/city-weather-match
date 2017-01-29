import React, { Component } from 'react';
import './css/App.css';

// The weather info for the NOAA stations.
const stationsObj = require('./data/weather.json');

// At some point make the defaul state values more meaningful. Perhaps the midway
// point between max and min possible values.
class App extends Component {
  constructor() {
    super();
    this.state = {
      maxTemp: 80,
      lowTemp: 40,
      snowfall: 10,
      precip: 10,
      matches: [],
      below32: 0,
      clicked: false
    };
    this.updateWeatherState = this.updateWeatherState.bind(this);
    this.findMatches = this.findMatches.bind(this);
  }

  // Function takes an info object with weather values { maxTemp: 100, lowTemp: 30, etc. }
  // and updates state with new info.
  updateWeatherState(info, bool) {

    let maxTemp = info["maxTemp"];
    let lowTemp = info["lowTemp"];
    let below32 = info["below32"];
    let snowfall = info["snowfall"];
    let precip = info["precip"];
    let matches = info["matches"];

    // Update state with new weather values
    this.setState({
      maxTemp: maxTemp,
      lowTemp: lowTemp,
      below32: below32,
      snowfall: snowfall,
      precip: precip,
      clicked: true,
      matches: matches
    });
  };

  // Takes an info object with selected weather values returns an array of stations
  // that match the search criteria.
  findMatches(info) {
    // Determine matches and then update state with new matches array
    let stationMatch = [];
    for (let station in stationsObj) {
      if (parseInt(stationsObj[station]["mlyTMaxAvg"][12], 10) < info["maxTemp"] &&
          parseInt(stationsObj[station]["mlyTMinAvg"][12], 10) > info["lowTemp"] &&
          parseInt(stationsObj[station]["daysBelow32"], 10) < info["below32"] &&
          parseInt(stationsObj[station]["annInchPlus"], 10) < info["snowfall"] &&
          parseInt(stationsObj[station]["annprcpge050hi"], 10) < info["precip"]) {
        stationMatch.push(station);
      };
    };
    return stationMatch;
  }


  render() {
    return (
      <div className="App">
        <div>
          <h1>A navbar heading will go here</h1>
        </div>

        {/* Because children of App are added in index.js by React Router, there is no good way to
          pass state values down as props to children. This is a workaround that clones children of
          App and adds needed props here. Looks funny but works fine. I'm not sure if there's
          a way to selectively pass on props depending on the child component, so all direct
          children will get all props. */}
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
            updateWeatherState: this.updateWeatherState,
            findMatches: this.findMatches,
            stationsObj: stationsObj
          })
        )}

      </div>
    );
  }
}

export default App;
