import { ChoroplethData } from './ChoroplethData'
import country_to_region from './CountryToRegion.json'

function getRegionFromCountryId(country_id) {
    return country_to_region[country_id]
}

function getRegionalData(data) {
    let result = []
    let look_idx = {}
    let idx = 0

    data.forEach(element => {
        let country_id = element["id"]
        let region = getRegionFromCountryId(country_id)

        if (!(region in look_idx)) {
            let new_entry = {
                "name": region,
                "children": [element],
                "color": "hsl(209, 70%, 50%)",
            }
            result.push(new_entry)
            look_idx[region] = idx
            idx++
        }
        else {
            let entry = result[look_idx[region]]
            entry["children"].push(element)
        }
    })

    return result
}

export function getHierarchyData() {
    const regional_data = getRegionalData(ChoroplethData)

    return (
        {
            "name": "Earth",
            "color": "hsl(209, 70%, 50%)",
            "children": regional_data
        }
    )
}