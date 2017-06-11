import React, { Component } from 'react';
import Chart from 'chart.js';
import '../css/graph.css';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.drawGraph = this.drawGraph.bind(this);
  }

  drawGraph() {
    const highTemp = this.props.highTemp;
    const lowTemp = this.props.lowTemp;

    let ctx = document.getElementById("myChart");

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
          title: { display: true }
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
        <canvas id="myChart" width='800px' height='400px'></canvas>
      </div>
    );
  }
}

export default Graph;
