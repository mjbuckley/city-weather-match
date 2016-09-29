import React, { Component } from 'react';
import WeatherInfo from './weatherinfo.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WeatherInfo />
      </div>
    );
  }
}

export default App;
