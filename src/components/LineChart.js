import React from "react";
import { ResponsiveLine } from "@nivo/line";
import CountryLookup from "./CountryLookup";

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
  findMatches() {
    let d = this.props.confirmed;
    let matches = []

    for (let i = 0; i < d.length; i++) {
      let country1 = CountryLookup[d[i]["Country/Region"]]
      let country2 = CountryLookup[this.props.country]
      
      if (!country1 || !country2) {
        console.log("Not found:", d[i]["Country/Region"], this.props.country)
      } else if (country1 == country2) {
        matches.push(i)
      }
    }

    return matches
  }

  parseData() {
    let idx = this.findMatches()[0]
    let dates = this.props.columns.slice(4, this.props.columns.length);

    return [ // The order of the array elements has an effect on the order of the custom toolkit.
      this.parseRow("Deaths", this.props.deaths[idx], dates),
      this.parseRow("Recovered", this.props.recovered[idx], dates),
      this.parseRow("Confirmed", this.props.confirmed[idx], dates),
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
    return (
      <div className="chart">
        <ResponsiveLine
          data={this.parseData()}
          margin={{ top: 20, right: 30, bottom: 50, left: 70 }}
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
            legend: `Cases (${ this.props.scale } scale)`,
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
