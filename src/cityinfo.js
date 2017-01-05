// This is a potential partial replacement for citylist

import React, { Component } from 'react';
import SharedAreaList from './sharedarealist';

class CityInfo extends Component {

  constructor() {
    super();
  }

  render() {
    const city = this.props.stationObject[Object.keys(this.props.stationObject)]["city"];
    const state = this.props.stationObject[Object.keys(this.props.stationObject)]["state"];
    const sharedArea = this.props.stationObject[Object.keys(this.props.stationObject)]["sharedarea"];
    const station = Object.keys(this.props.stationObject)[0];
    let accordionStyle = (this.props.expanded === station) ? {display: 'inherit'} : {display: 'none'};

    return (
      <div>
        <p>WEATHER INFO HERE</p>
        <p>GRAPH GOES HERE</p>
        {(sharedArea.length > 0) ? (
        <SharedAreaList city={city} sharedarea={sharedArea} />
        ) : null }
      </div>
    );
  }
}

export default CityInfo;
