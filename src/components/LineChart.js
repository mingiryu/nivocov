import React from "react";
import { ResponsiveLine } from "@nivo/line";

/*  Chart data, which must conform to this structure:
    Array<{
        id:   string | number
        data: Array<{
            x: number | string | Date
            y: number | string | Date
        }>
    }>
*/

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: props.data.columns,
      confirmed: props.data.confirmed,
      deaths: props.data.deaths,
      recovered: props.data.recovered,
      country: props.data.country,
      province: props.data.province
    };
  }

  getIdx() {
    let d = this.state.confirmed;
    for (let i = 0; i < d.length; i++) {
      if (d[i]["Country/Region"] == this.state.country && d[i]["Province/State"] == this.state.province) {
        return i
      } 
    }
  }

  parseData(idx) {
    let dates = this.state.columns.slice(4, this.state.columns.length);

    return [ // The order of the array elements has an effect on the order of the custom toolkit.
      this.parseRow("Deaths", this.state.deaths[idx], dates),
      this.parseRow("Recovered", this.state.recovered[idx], dates),
      this.parseRow("Confirmed", this.state.confirmed[idx], dates),
    ];
  }

  parseRow(id, row, dates) {
    let points = []

    dates.forEach(date => {
      let y = +row[date];
      
      if (y) { // Drop zeros since we are using log scale.
        points.push({
          x: date + "20", // Change year format from YY to YYYY.
          y: y
        })
      }
    });

    return {
      id: id,
      data: points
    };
  }

  render() {
    let idx = this.getIdx();
    let confirmed = this.state.confirmed[idx];
    let max = +confirmed[this.state.columns[this.state.columns.length - 1]];

    return (
      <ResponsiveLine
        data={this.parseData(idx)}
        margin={{ top: 50, right: 30, bottom: 50, left: 70 }}
        xScale={{
          type: "time",
          format: "%m/%d/%Y",
          precision: "day"
        }}
        xFormat="time:%m/%d/%Y"
        yScale={{
          type: "log",
          min: "auto",
          max: max,
          stacked: false,
          reverse: false
        }}
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: "%b %d",
          legend: "Dates (month/day)",
          legendOffset: 36,
          legendPosition: "middle"
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Cases (logarithmic scale)",
          legendOffset: -50,
          legendPosition: "middle"
        }}
        colors={{ scheme: "pastel1" }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "top-left",
            direction: "column",
            justify: false,
            translateX: 20,
            translateY: 20,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        animate={false}
        enableSlices="x"
        sliceTooltip={({ slice }) => {
          return (
            <div
              style={{
                background: "white",
                padding: "9px 12px",
                border: "1px solid #ccc"
              }}
            >
              <div>{this.state.province}</div>
              <div>{this.state.country}</div>
              {slice.points.map(point => (
                <div
                  key={point.id}
                  style={{
                    color: point.serieColor,
                    padding: "3px 0"
                  }}
                >
                  <strong>{point.serieId}</strong> [{point.data.yFormatted}]
                </div>
              ))}
            </div>
          );
        }}
      />
    );
  }
}
export default LineChart;
