import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import CountryLookup from "./CountryLookup";

class BarChart extends React.Component {
  parseData(data) {
    let res = {};

    data.forEach(element => {
      const ISO = CountryLookup[element["Country/Region"]];

      if (!ISO) console.log(element["Country/Region"]);
      if (!res[ISO]) {
        res[ISO] = {
          id: ISO,
          name: element["Country/Region"],
          Confirmed: +element.Confirmed,
          Deaths: +element.Deaths,
          Recovered: +element.Recovered
        };
      } else {
        let country = res[ISO];
        country.Confirmed += +element.Confirmed;
        country.Deaths += +element.Deaths;
        country.Recovered += +element.Recovered;
      }
    });
    return Object.keys(res).map(function(key) {
      return {
        Country: res[key].name,
        "Fatality %": ((res[key].Deaths / res[key].Confirmed) * 100).toFixed(1),
        "Recovery %": ((res[key].Recovered / res[key].Confirmed) * 100).toFixed(1),
        "Active %": (((res[key].Confirmed-res[key].Deaths-res[key].Recovered) / res[key].Confirmed) * 100).toFixed(1),
      };
    });
  }

  onClick(data, event) {
    this.props.updateCountry(data.data.Country)
  }

  render() {
    return (
      <div className="one">
        <div className="bar">
          <ResponsiveBar
            data={this.parseData(this.props.data).slice(0, 50).reverse()}
            keys={["Fatality %", "Recovery %", "Active %"]}
            indexBy="Country"
            margin={{ top: 30, right: 50, bottom: 70, left: 150 }}
            groupMode="stacked"
            layout="horizontal"
            colors={{ scheme: "pastel1" }}
            maxValue={100}
            onClick={(data, event) => this.onClick(data, event)} 
            axisBottom={{
              tickPadding: 5,
              tickRotation: 0,
              legend: "(%)",
              legendPosition: "middle",
              legendOffset: 32
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendPosition: "top",
              legendOffset: 0,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "top-left",
                direction: "row",
                translateX: 0,
                translateY: -20,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
            animate={false}
            motionStiffness={100}
            motionDamping={15}
          />
        </div>
      </div>
    );
  }
}
export default BarChart;