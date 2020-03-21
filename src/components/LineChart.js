import React from "react";
import { ResponsiveLine } from "@nivo/line";
import toISO from "./toISO";

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
    super(props)

    this.state = { 
      confirmed: this.props.confirmed, 
      recovered: this.props.recovered,
      deaths: this.props.deaths, 
      dates: this.props.columns.slice(4, this.props.columns.length)
    }
  }

  parseData() {
    const target = toISO[this.props.country]

    return [ // The order of the array elements has an effect on the order of the custom toolkit.
      {id: "Deaths", data: this.aggData(target, this.state.deaths)},
      {id: "Recovered", data: this.aggData(target, this.state.recovered)},
      {id: "Confirmed", data: this.aggData(target, this.state.confirmed)},
    ];
  }

  aggData(target, data) {
    // Allocate data structure
    let agg = this.state.dates.map(date => ({ x: date + "20", y: 0 }))

    // Find matches and sum it up
    data.forEach(d => {
      const country = toISO[d["Country/Region"]]

      if (country === target) {
        for (var i = 0; i < this.state.dates.length; i++) {
          agg[i].y += +d[this.state.dates[i]]
        }
      }
    })

    // Filter out 0's for log scale
    agg = agg.filter(d => d.y)
    return agg
  }

  render() {
    return (
      <div className="chart">
        <hr></hr>
        <span>Trends</span>
        <ResponsiveLine
          data={this.parseData()}
          margin={{ top: 10, right: 30, bottom: 50, left: 120 }}
          xScale={{
            type: "time",
            format: "%m/%d/%Y",
            precision: "day"
          }}
          xFormat="time:%m/%d/%Y"
          yScale={{
            type: this.props.scale,
            min: "auto",
            max: "auto",
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
            legend: `Cases (${this.props.scale} scale)`,
            legendOffset: -70,
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
              symbolBorderColor: "white",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "white",
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          animate={true}
          enableSlices="x"
          sliceTooltip={({ slice }) => {
            return (
              <div
                style={{
                  background: "white",
                  padding: "9px 12px",
                  border: "1px solid #ccc",
                  boxShadow: "1px 1px 1px gray"
                }}
              >
                <div>{this.props.country}</div>
                <strong>{slice.points[0].data.xFormatted}</strong>
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
      </div>
    );
  }
}
export default LineChart;
