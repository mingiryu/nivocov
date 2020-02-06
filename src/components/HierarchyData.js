import { ChoroplethData } from './ChoroplethData'
import country_to_region from './CountryToRegion.json'

const region_names = ['Asia', 'Europe', 'Africa', 'Oceania', 'Americas', 'Antarctica']

function getRegionFromCountryId(country_id) {
    return country_to_region[country_id]
}

function getCountryData() {
    let country_data= {}

    region_names.forEach(region_name => {
        country_data[region_name] = []
    });

    ChoroplethData.forEach(country => {
            const region_name = getRegionFromCountryId(country["id"])

            country_data[region_name].push({
                "name": country["Country/Region"],
                "color": "hsl(209, 70%, 50%)",
                "loc": country["value"]
            })
        }
    )

    return country_data
}

function getRegionData(country_data) {
    let region_data = []

    region_names.forEach(region_name => {
        region_data.push({
            "name": region_name,
            "color": "hsl(209, 70%, 50%)",
            "children": country_data[region_name],
        })
    });

    return region_data
}

export function getHierarchyData() {
    const country_data = getCountryData()
    const region_data = getRegionData(country_data)

    return (
        {
            "name": "Earth",
            "color": "hsl(209, 70%, 50%)",
            "children": region_data
        }
    )
}