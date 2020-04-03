import React from "react";
import { ResponsiveStream } from "@nivo/stream";
import toISO from "./toISO";
import COVIDContext from "./COVIDContext";

class StreamChart extends React.Component {
    static contextType = COVIDContext;

    constructor(props, context) {
        super(props);

        this.state = {
            dates: context.columns.slice(4, context.columns.length),
            confirmed: context.confirmed,
            recovered: context.recovered,
            deaths: context.deaths
        };
    }

    parseData(dates, country, _confirmed, _deaths, _recovered) {
        const target = toISO[country];

        // Get aggregated data
        const confirmed = this.aggData(dates, target, _confirmed);
        const recovered = this.aggData(dates, target, _recovered);
        const deaths = this.aggData(dates, target, _deaths);

        let data = [];
        let caseFound = false;

        // Drop dates before the first case
        for (var i = 0; i < dates.length - 1; i++) {
            if (confirmed[i] || recovered[i] || deaths[i]) {
                caseFound = true;
            }

            if (caseFound) {
                data.push({
                    Confirmed: confirmed[i],
                    Recovered: recovered[i],
                    Deaths: deaths[i]
                });
            }
        }

        return data;
    }

    aggData(dates, target, data) {
        // Allocate data structure
        let agg = dates.map(() => 0);

        // Find matches and sum it up
        data.forEach(d => {
            const country = toISO[d["Country/Region"]];

            if (country === target) {
                for (var i = 0; i < agg.length; i++) {
                    agg[i] += +d[dates[i]];
                }
            }
        });

        // Get daily counts
        for (var i = agg.length - 1; i > 0; i--) {
            agg[i] -= agg[i - 1];
        }
        return agg;
    }

    render() {
        const data = this.parseData(
            this.state.dates,
            this.context.country,
            this.state.confirmed,
            this.state.deaths,
            this.state.recovered
        );
        return (
            <div className="chart">
                <hr></hr>
                <span>Trends</span>
                <ResponsiveStream
                    data={data}
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
                        legendOffset: 46
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
                    dotBorderColor={{
                        from: "color",
                        modifiers: [["darker", 0.7]]
                    }}
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
export default StreamChart;
