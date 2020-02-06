import * as React from 'react'
import { ResponsiveBubble } from '@nivo/circle-packing'
import { getHierarchyData } from './HierarchyData.js'

export default class Bubble extends React.Component {
    render() {
        return (
            <ResponsiveBubble
                root={getHierarchyData()}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                identity="name"
                value="loc"
                colors={{ scheme: 'nivo' }}
                colorBy="name"
                padding={6}
                label="name"
                enableLabel={false}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
                borderWidth={2}
                borderColor={{ from: 'color' }}
                defs={[
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'none',
                        color: 'inherit',
                        rotation: -45,
                        lineWidth: 5,
                        spacing: 8
                    }
                ]}
                fill={[ { match: { depth: 1 }, id: 'lines' } ]}
                animate={true}
                motionStiffness={90}
                motionDamping={12}
            />
        )
    }
}