import * as d3 from "d3";
import CountryLookup from './CountryLookup'
import country_to_region from './CountryToRegion.json'

export default function getData() {
    const d = new Date()
    let date = `0${d.getMonth()+1}-${d.getDate()-1}-${d.getFullYear()}`
    let base_url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/"
    let full_url = base_url + date + ".csv"

    return d3.csv(full_url)
        .then((raw_data) => {
            const data = parseData(raw_data)

            let hierarchy_data = getHierarchyData(data)
            localStorage.setItem("hierarchy_data", JSON.stringify(hierarchy_data));

            let total_confirmed = 0
            let total_fatalities = 0
            let total_recovered = 0

            data.forEach(entry => {
                total_confirmed += entry["confirmed"]
                total_fatalities += entry["fatalities"]
                total_recovered += entry["recovered"]
            })

            localStorage.setItem("total_confirmed", total_confirmed);
            localStorage.setItem("total_fatalities", total_fatalities);
            localStorage.setItem("total_recovered", total_recovered);

            return data
        })
}

function parseData(data) {
    let result = []
    let lookup_idx = {}
    let idx = 0

    data.forEach(element => {
        let iso_alpha_3 = CountryLookup[element["Country/Region"]]

        // Add a new entry of country
        if (!(iso_alpha_3 in lookup_idx)) {
            let new_entry = {
                "id": iso_alpha_3,
                "name": element["Country/Region"],
                "confirmed": parseInt(element["Confirmed"]),
                "fatalities": parseInt(element["Deaths"]),
                "recovered": parseInt(element["Recovered"]),
            }

            if (element["Province/State"]) {
                let child = {
                    "name": element["Province/State"],
                    "confirmed": parseInt(element["Confirmed"]),
                    "fatalities": parseInt(element["Deaths"]),
                    "recovered": parseInt(element["Recovered"]),
                }
                new_entry["children"] = [child]
            }

            result.push(new_entry)
            lookup_idx[iso_alpha_3] = idx
            idx++;
        } else {
            // An entry already exists, so add child to the entry
            let entry = result[lookup_idx[iso_alpha_3]]

            let child = {
                "name": element["Province/State"],
                "confirmed": parseInt(element["Confirmed"]),
                "fatalities": parseInt(element["Deaths"]),
                "recovered": parseInt(element["Recovered"]),
            }

            entry["confirmed"] += child["confirmed"]
            entry["children"].push(child)
        }
    });
    return result
}

function getRegionalData(data) {
    let result = []
    let look_idx = {}
    let idx = 0

    data.forEach(element => {
        let country_id = element["id"]
        let region = country_to_region[country_id]

        if (!(region in look_idx)) {
            let new_entry = {
                "name": region,
                "children": [element],
            }
            result.push(new_entry)
            look_idx[region] = idx
            idx++
        } else {
            let entry = result[look_idx[region]]
            entry["children"].push(element)
        }
    })

    return result
}

function getHierarchyData(data) {
    return ({
        "name": "World",
        "children": getRegionalData(data)
    })
}