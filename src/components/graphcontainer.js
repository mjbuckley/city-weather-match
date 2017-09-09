import React, { Component } from 'react';
import Graph from './graph.js';
import MobileGraph from './mobilegraph.js';

// Renders correct graph based on window size. See notes for why this is necessary.
class GraphContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { width: window.innerWidth };
    this.setWidth = this.setWidth.bind(this);
  }

  setWidth() {
    this.setState({ width: window.innerWidth });
  }

  componentWillMount() {
    window.addEventListener('resize', this.setWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWidth);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      (this.state.width <= 450 && nextState.width > 450) ||
      (this.state.width > 450 && nextState.width <= 450) ||
      (this.props.highTemp !== nextProps.highTemp) ||
      (this.props.lowTemp !== nextProps.lowTemp)
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {

    if (this.state.width > 450) {
      return(
        <Graph highTemp={this.props.highTemp} lowTemp={this.props.lowTemp} />
      );
    } else {
      return(
        <MobileGraph highTemp={this.props.highTemp} lowTemp={this.props.lowTemp} />
      );
    }
  }
}

export default GraphContainer;
