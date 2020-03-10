import React from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import Countries from "./world_countries";
import CountryLookup from "./CountryLookup";

class Choropleth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.parseData(props.data.data)
    };
  }

  parseData(data) {
    let res = {};

    data.forEach(element => {
      const ISO = CountryLookup[element["Country/Region"]];

      if (!ISO)
        console.log(element["Country/Region"]) 
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
      return res[key];
    });
  }

  render() {
    return (
      <div className="three">
        <div className="map">
          <p>Confirmed</p>
          <ResponsiveChoropleth
            data={this.state.data}
            features={Countries.features}
            margin={{ top: 50, right: 0, bottom: 50, left: 0 }}
            colors="PiYG"
            value="Confirmed"
            domain={[0, 10000]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={100}
            projectionTranslation={[0.5, 0.5]}
            projectionRotation={[0, 0, 0]}
            enableGraticule={true}
            graticuleLineColor="#dddddd"
            borderWidth={1}
            borderColor={{ theme: "background" }}
            legends={[
              {
                anchor: "left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: 70,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: "#444444",
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000000",
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          ></ResponsiveChoropleth>
        </div>
        <div className="map">
          <p>Deaths</p>
          <ResponsiveChoropleth
            data={this.state.data}
            features={Countries.features}
            margin={{ top: 50, right: 0, bottom: 50, left: 0 }}
            colors="RdBu"
            value="Deaths"
            domain={[0, 1000]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={100}
            projectionTranslation={[0.5, 0.5]}
            projectionRotation={[0, 0, 0]}
            enableGraticule={true}
            graticuleLineColor="#dddddd"
            borderWidth={1}
            borderColor={{ theme: "background" }}
            legends={[
              {
                anchor: "left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: 70,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: "#444444",
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000000",
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          ></ResponsiveChoropleth>
        </div>
        <div className="map">
          <p>Recovered</p>
          <ResponsiveChoropleth
            data={this.state.data}
            features={Countries.features}
            margin={{ top: 50, right: 0, bottom: 50, left: 0 }}
            colors="PuOr"
            value="Recovered"
            domain={[0, 1000]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={100}
            projectionTranslation={[0.5, 0.5]}
            projectionRotation={[0, 0, 0]}
            enableGraticule={true}
            graticuleLineColor="#dddddd"
            borderWidth={1}
            borderColor={{ theme: "background" }}
            legends={[
              {
                anchor: "left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: 70,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: "#444444",
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000000",
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          ></ResponsiveChoropleth>
        </div>
      </div>
    );
  }
}
export default Choropleth;
