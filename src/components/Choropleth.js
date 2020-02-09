import React from 'react'
import { ResponsiveChoropleth } from '@nivo/geo'
import { ChoroplethData } from './ChoroplethData'
import Countries from './world_countries'

export default class Choropleth extends React.Component {
    render() {
        return (
            <ResponsiveChoropleth
                data={ChoroplethData}
                features={Countries.features}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                colors="nivo"
                value="sum"
                domain={[ 0, 35000 ]}
                unknownColor="#666666"
                label="properties.name"
                valueFormat=".2s"
                projectionType="naturalEarth1"
                projectionScale={200}
                projectionTranslation={[ 0.5, 0.5 ]}
                projectionRotation={[ 0, 0, 0 ]}
                enableGraticule={false}
                graticuleLineColor="#dddddd"
                borderWidth={0.5}
                borderColor={{ theme: 'background' }}
                legends={[
                    {
                        anchor: 'left',
                        direction: 'column',
                        justify: true,
                        translateX: 20,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemWidth: 94,
                        itemHeight: 18,
                        itemDirection: 'left-to-right',
                        itemTextColor: '#444444',
                        itemOpacity: 0.85,
                        symbolSize: 18,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000000',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        )
    }
}