import React, { Component } from 'react';
import { hashHistory } from 'react-router'
import './App.css';

// The weather info for the NOAA stations.
const stationsObj = require('./weather.json');

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
  }

  // Function takes an info object with weather values { maxTemp: 100, lowTemp: 30, etc. }
  // and updates state with new info.
  updateWeatherState(info) {

    let maxTemp = info["maxTemp"];
    let lowTemp = info["lowTemp"];
    let below32 = info["below32"];
    let snowfall = info["snowfall"];
    let precip = info["precip"];

    // Determine matches and then update state with new matches array
    let stationMatch = [];
    for (let station in stationsObj) {
      if (parseInt(stationsObj[station]["mlyTMaxAvg"][12], 10) < maxTemp &&
          parseInt(stationsObj[station]["mlyTMinAvg"][12], 10) > lowTemp &&
          parseInt(stationsObj[station]["daysBelow32"], 10) < below32 &&
          parseInt(stationsObj[station]["annInchPlus"], 10) < snowfall &&
          parseInt(stationsObj[station]["annprcpge050hi"], 10) < precip) {
        stationMatch.push(station);
      };
    };

    // Update state with new weather values
    this.setState({
      maxTemp: maxTemp,
      lowTemp: lowTemp,
      below32: below32,
      snowfall: snowfall,
      precip: precip,
      clicked: true,
      matches: stationMatch
    });

    // This manually directs browser to results page.
    hashHistory.push('/results');
  };


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
            stationsObj: stationsObj
          })
        )}

      </div>
    );
  }
}

export default App;
