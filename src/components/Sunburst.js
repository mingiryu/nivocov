import * as React from 'react'
import { ResponsiveSunburst } from '@nivo/sunburst'
import { getHierarchyData } from './HierarchyData.js'

export default class Sunburst extends React.Component {
    render() {
        return (
            <ResponsiveSunburst
                data={getHierarchyData()}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                identity="name"
                value="loc"
                cornerRadius={2}
                borderWidth={1}
                borderColor="white"
                colors={{ scheme: 'nivo' }}
                childColor="noinherit"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                isInteractive={true}
            />
        )
    }
}