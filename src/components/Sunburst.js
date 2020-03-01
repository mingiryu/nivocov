import * as React from "react";
import { ResponsiveSunburst } from "@nivo/sunburst";

export default class Sunburst extends React.Component {
  render() {
    let data = JSON.parse(localStorage.getItem("hierarchy_data"));

    return (
      <ResponsiveSunburst
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        identity="name"
        value="confirmed"
        cornerRadius={2}
        borderWidth={1}
        borderColor="background"
        colors={{ scheme: "spectral" }}
        childColor="noinherit"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        isInteractive={true}
      />
    );
  }
}
