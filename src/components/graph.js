import React, { Component } from 'react';
import Chart from 'chart.js';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.functionName = this.functionName.bind(this);
  }

  // functionName() {
  //   console.log("rendering");
  //   let ctx = document.getElementById("myChart");
  //   let myChart = new Chart(ctx, {
  //       type: 'bar',
  //       data: {
  //           labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  //           datasets: [{
  //               label: '# of Votes',
  //               data: [12, 19, 3, 5, 2, 3],
  //               backgroundColor: [
  //                   'rgba(255, 99, 132, 0.2)',
  //                   'rgba(54, 162, 235, 0.2)',
  //                   'rgba(255, 206, 86, 0.2)',
  //                   'rgba(75, 192, 192, 0.2)',
  //                   'rgba(153, 102, 255, 0.2)',
  //                   'rgba(255, 159, 64, 0.2)'
  //               ],
  //               borderColor: [
  //                   'rgba(255,99,132,1)',
  //                   'rgba(54, 162, 235, 1)',
  //                   'rgba(255, 206, 86, 1)',
  //                   'rgba(75, 192, 192, 1)',
  //                   'rgba(153, 102, 255, 1)',
  //                   'rgba(255, 159, 64, 1)'
  //               ],
  //               borderWidth: 1
  //           }]
  //       },
  //       options: {
  //           scales: {
  //               yAxes: [{
  //                   ticks: {
  //                       beginAtZero:true
  //                   }
  //               }]
  //           }
  //       }
  //   });
  // }

  functionName() {
    console.log("rendering");
    let ctx = document.getElementById("myChart");
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May"],
            datasets: [{
                label: 'Avg. high temp',
                data: [40, 45, 55, 65, 75],
                borderColor: "#3e95cd"
              }, {
                label: 'Avg. low temp',
                data: [25, 30, 35, 45, 50],
                borderColor: "#8e5ea2"
            }]
        },
        options: {
          title: {
            display: true,
            text: 'This is my Title'
          }
        }
    });
  }

  componentDidMount() {
    this.functionName();
  }

  componentDidUpdate() {
    this.functionName();
  }

  render() {
    return (
      <div className="chart-container" style={{position: 'relative', maxHeight: '400px', maxWidth: '800px'}}>
        <canvas id="myChart"></canvas>
      </div>
    );
  }
}

export default Graph;
