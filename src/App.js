import React, { Component } from 'react';
import { Link } from 'react-router';
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

  // Function takes an info object with weather values { maxTemp: 100, lowTemp: 30, etc. }
  // and updates state with new info.
  updateWeatherState(info) {

    const maxTemp = info["maxTemp"];
    const lowTemp = info["lowTemp"];
    const below32 = info["below32"];
    const snowfall = info["snowfall"];
    const precip = info["precip"];
    const matches = info["matches"];

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
