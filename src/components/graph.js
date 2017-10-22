import React, { Component } from 'react';
import Chart from 'chart.js';
import '../css/graph.css';


/**
 * This is the standard graph component. mobilegraph.js is the same as this but with different graph
 * proportions and shorter month labels.
 */
class Graph extends Component {
  
  constructor(props) {
    super(props);
    this.drawGraph = this.drawGraph.bind(this);
  }

  drawGraph() {
    const highTemp = this.props.highTemp;
    const lowTemp = this.props.lowTemp;

    // this.canvas is a ref set on canvas element in return function
    const ctx = this.canvas.getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                    "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                label: 'Avg. high temp',
                data: highTemp,
                borderColor: "#e74c3c",
                fill: false
              }, {
                label: 'Avg. low temp',
                data: lowTemp,
                borderColor: "#2980b9",
                fill: false
            }]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: "Average Monthly Hi and Low Temperatures",
            fontSize: 14,
            fontFamily: "'Helvetica', 'Arial', sans-serif",
            fontStyle: "regular",
            padding: 15}
        }
    });
  }

  componentDidMount() {
    this.drawGraph();
  }

  componentDidUpdate() {
    this.drawGraph();
  }

  render() {
    return (
      <div className="chart-container" style={{position: 'relative', maxHeight: '400px', maxWidth: '800px'}}>
        <canvas id="chart" ref={canvas => this.canvas = canvas} width='800px' height='400px'></canvas>
      </div>
    );
  }
}

export default Graph;
