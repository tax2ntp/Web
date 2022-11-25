import { type } from "@testing-library/user-event/dist/type";
import {React,Component} from "react";
import ReactApexChart from 'react-apexcharts'

class ApexChartOne extends Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
            name: "X",
            data: props.data.x,
            type: 'scatter'
          },
          {
            name: "Linear Expression",
            data: props.data.y,
            type: 'line'
          }
        ],
        options : {
            chart: {
            height: 350,
            type: 'line',
          },
          fill: {
            type:'solid',
          },
          markers: {
            size: [6, 0]
          },
          tooltip: {
            shared: false,
            intersect: true,
          },
          legend: {
            tooltipHoverFormatter: function(val, opts) {
              return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
            }
          },
          xaxis: {
            type: 'numeric',
            tickAmount: 12
          },
          title: {
            text: 'Graph'
          }
          }
      };
    }

    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} height={350} width={550} />
            </div>
            );
        }
}

export default ApexChartOne;