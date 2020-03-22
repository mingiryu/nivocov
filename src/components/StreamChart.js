import React from "react";
import { ResponsiveStream } from "@nivo/stream";
import toISO from "./toISO";

class StreamChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmed: this.props.confirmed,
            recovered: this.props.recovered,
            deaths: this.props.deaths,
            dates: this.props.columns.slice(4, this.props.columns.length)
        }
    }

    parseData() {
        const target = toISO[this.props.country]

        // Get aggregated data
        const confirmed = this.aggData(target, this.state.confirmed)
        const recovered = this.aggData(target, this.state.recovered)
        const deaths = this.aggData(target, this.state.deaths)

        let data = []
        let caseFound = false

        // Drop dates before the first case
        for (var i = 0; i < this.state.dates.length - 1; i++) {
            if (confirmed[i] || recovered[i] || deaths[i]) {
                caseFound = true
            }

            if (caseFound) {
                data.push({
                    "Confirmed": confirmed[i],
                    "Recovered": recovered[i],
                    "Deaths": deaths[i]
                })
            }
        }

        return data
    }

    aggData(target, data) {
        // Allocate data structure
        let agg = this.state.dates.map(() => 0)

        // Find matches and sum it up
        data.forEach(d => {
            const country = toISO[d["Country/Region"]]

            if (country === target) {
                for (var i = 0; i < agg.length; i++) {
                    agg[i] += +d[this.state.dates[i]]
                }
            }
        })

        // Get daily counts
        for (var i = agg.length - 1; i > 0; i--) {
            agg[i] -= agg[i - 1]
        }
        return agg
    }

    render() {
        return (
            <div className="chart">
                <hr></hr>
                <span>Occurrences</span>
                <ResponsiveStream
                    data={this.parseData()}
                    keys={["Deaths", "Recovered", "Confirmed"]}
                    margin={{ top: 10, right: 30, bottom: 80, left: 90 }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: "bottom",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -90,
                        legend: "Days Since the First Case",
                        legendPosition: "middle",
                        legendOffset: 46,
                    }}
                    axisLeft={{
                        orient: "left",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Daily Cases",
                        legendOffset: -70,
                        legendPosition: "middle"
                    }}
                    offsetType="silhouette"
                    colors={{ scheme: "pastel1" }}
                    fillOpacity={0.85}
                    borderColor="gray"
                    dotSize={8}
                    dotColor={{ from: "color" }}
                    dotBorderWidth={2}
                    dotBorderColor={{ from: "color", modifiers: [["darker", 0.7]] }}
                    animate={true}
                    motionStiffness={50}
                    motionDamping={15}
                    legends={[
                        {
                            anchor: "top-left",
                            direction: "column",
                            translateX: 20,
                            translateY: 20,
                            itemWidth: 80,
                            itemHeight: 20,
                            itemTextColor: "#999999",
                            symbolSize: 12,
                            symbolShape: "circle",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemTextColor: "#000000"
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
        );
    }
}
export default StreamChart