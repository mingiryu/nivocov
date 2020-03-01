import * as React from "react";
import { ResponsiveBubble } from "@nivo/circle-packing";

export default class Bubble extends React.Component {
  render() {
    let data = JSON.parse(localStorage.getItem("hierarchy_data"));

    return (
      <ResponsiveBubble
        root={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        identity="name"
        value="confirmed"
        colors={{ scheme: "spectral" }}
        padding={6}
        enableLabel={false}
        labelTextColor={{ from: "color", modifiers: [["darker", 1]] }}
        borderWidth={1}
        borderColor="background"
        defs={[
          {
            id: "lines",
            type: "patternLines",
            background: "none",
            color: "inherit",
            rotation: -45,
            lineWidth: 5,
            spacing: 8
          }
        ]}
        fill={[{ match: { depth: 1 }, id: "lines" }]}
        animate={true}
        motionStiffness={90}
        motionDamping={12}
      />
    );
  }
}
