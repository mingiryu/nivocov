import React from "react";
import { ResponsiveLine } from "@nivo/line";
import toISO from "./toISO";
import COVIDContext from "./COVIDContext";

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

    parseData(dates, country, confirmed, deaths, recovered) {
        const target = toISO[country];

        return [
            // The order of the array elements has an effect on the order of the custom toolkit.
            { id: "Deaths", data: this.aggData(dates, target, deaths) },
            {
                id: "Recovered",
                data: this.aggData(dates, target, recovered)
            },
            {
                id: "Confirmed",
                data: this.aggData(dates, target, confirmed)
            }
        ];
    }

    aggData(dates, target, data) {
        // Allocate data structure
        let agg = dates.map(date => ({ x: date + "20", y: 0 }));

        // Find matches and sum it up
        data.forEach(d => {
            const country = toISO[d["Country/Region"]];

            if (country === target) {
                for (var i = 0; i < dates.length; i++) {
                    agg[i].y += +d[dates[i]];
                }
            }
        });

        // Filter out 0's for log scale
        agg = agg.filter(d => d.y);
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
                <span>Growth</span>
                <ResponsiveLine
                    data={data}
                    margin={{ top: 10, right: 30, bottom: 80, left: 120 }}
                    xScale={{
                        type: "time",
                        format: "%m/%d/%Y",
                        precision: "day"
                    }}
                    xFormat="time:%m/%d/%Y"
                    yScale={{
                        type: this.context.scale,
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
                        legend: `Total Cases (${this.context.scale} scale)`,
                        legendOffset: -70,
                        legendPosition: "middle"
                    }}
                    colors={{ scheme: "pastel1" }}
                    pointSize={5}
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
                    motionStiffness={50}
                    motionDamping={15}
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
                                <div>{this.context.country}</div>
                                <strong>
                                    {slice.points[0].data.xFormatted}
                                </strong>
                                {slice.points.map(point => (
                                    <div
                                        key={point.id}
                                        style={{
                                            color: point.serieColor,
                                            padding: "3px 0"
                                        }}
                                    >
                                        <strong>{point.serieId}</strong> [
                                        {point.data.yFormatted}]
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
