import React, { Component } from 'react';
import { hashHistory } from 'react-router'
import './App.css';

// The weather info for the NOAA stations.
const stationsObj = require('./weather.json');

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

  // Takes an info object with weather values { maxTemp: 100, lowTemp: 30, etc. }
  updateWeatherState(info) {
    // Update state with new weather values

    let maxTemp = info["maxTemp"];
    let lowTemp = info["lowTemp"];
    let below32 = info["below32"];
    let snowfall = info["snowfall"];
    let precip = info["precip"];

    console.log(maxTemp);
    console.log(lowTemp);
    console.log(below32);
    console.log(snowfall);
    console.log(precip);

    // Determine matches and then update state with new matches array
    // I think above changes in state will be reflected below, but if not just use
    // info object instead.
    let stationMatch = [];
    for (let station in stationsObj) {
      if (parseInt(stationsObj[station]["mlyTMaxAvg"][12], 10) < maxTemp &&
          parseInt(stationsObj[station]["mlyTMinAvg"][12], 10) > lowTemp &&
          parseInt(stationsObj[station]["daysBelow32"], 10) < below32 &&
          parseInt(stationsObj[station]["annInchPlus"], 10) < snowfall &&
          parseInt(stationsObj[station]["annprcpge050hi"], 10) < precip) {
        stationMatch.push(station);
      };



      // let stationMatch = [];
      // for (let station in stationsObj) {
      //   if (parseInt(stationsObj[station]["mlyTMaxAvg"][12], 10) < this.state.maxTemp &&
      //       parseInt(stationsObj[station]["mlyTMinAvg"][12], 10) > this.state.lowTemp &&
      //       parseInt(stationsObj[station]["daysBelow32"], 10) < this.state.below32 &&
      //       parseInt(stationsObj[station]["annInchPlus"], 10) < this.state.snowfall &&
      //       parseInt(stationsObj[station]["annprcpge050hi"], 10) < this.state.precip) {
      //     stationMatch.push(station);
      //   };


      // console.log(this.state.maxTemp);
      // console.log(this.state.lowTemp);
      // console.log(this.state.below32);
      // console.log(this.state.snowfall);
      // console.log(this.state.precip);

    };

    this.setState({
      maxTemp: maxTemp,
      lowTemp: lowTemp,
      below32: below32,
      snowfall: snowfall,
      precip: precip,
      clicked: true,
      matches: stationMatch
    });

    // this.setState({matches: stationMatch});
    // this.setState({clicked: true});

    // I beleive this should manually link to results page. It might require react Router
    // and necessary componets to be imported on this page.
    hashHistory.push('/results');
  };

  // The React.Children.map SHOULD pass on state values as props to all direct children of App.
  // See of this works as expected. (I should really be using redux but want to see if this works).
  render() {
    return (
      <div className="App">
        <div>
          <h1>A navbar heading will go here</h1>
        </div>

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
