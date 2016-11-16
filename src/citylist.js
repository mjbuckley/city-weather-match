import React, { Component } from 'react';
import SharedAreaList from './sharedarealist';

class CityList extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const station2 = this.props.stationObject[Object.keys(this.props.stationObject)];
    this.props.onClick(station2);
  }

  render() {
    const city = this.props.stationObject[Object.keys(this.props.stationObject)]["location"]["city"];
    const state = this.props.stationObject[Object.keys(this.props.stationObject)]["location"]["state"];
    const sharedArea = this.props.stationObject[Object.keys(this.props.stationObject)]["location"]["sharedarea"];
    const station = this.props.stationObject[Object.keys(this.props.stationObject)[0]];
    let accordionStyle = (this.props.expanded === station) ? {display: 'inherit'} : {display: 'none'};

    return (
      <li key={station} className={CityList}>
        <a onClick={this.handleClick}>{city}, {state}</a>
        <div style={accordionStyle}>
          <p>Some test text</p>
          {(sharedArea.length > 0) ? (
          <SharedAreaList sharedarea={sharedArea} />
          ) : null }
        </div>
      </li>
    );
  }
}

export default CityList;
