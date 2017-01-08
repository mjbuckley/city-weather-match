import React, { Component } from 'react';
import SharedAreaList from './sharedarealist';

class CityList extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const station2 = this.props.station;
    this.props.onClick(station2);
  }

  render() {

    const city = this.props.stationsobj[this.props.station]["city"];
    const state = this.props.stationsobj[this.props.station]["state"];
    const sharedArea = this.props.stationsobj[this.props.station]["sharedarea"];
    let accordionStyle = (this.props.expanded === this.props.station) ? {display: 'inherit'} : {display: 'none'};

    return (
      <li key={this.props.station} className={CityList}>
        <a onClick={this.handleClick}>{city}, {state}</a>
        <div style={accordionStyle}>
          <p>Some test text</p>
          {(sharedArea.length > 0) ? (
          <SharedAreaList city={city} sharedarea={sharedArea} />
          ) : null }
        </div>
      </li>
    );
  }
}

export default CityList;
