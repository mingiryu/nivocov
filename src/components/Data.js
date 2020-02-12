import * as d3 from "d3";
import CountryLookup from './CountryLookup'

const url = "https://raw.githubusercontent.com/CSSEGISandData/2019-nCoV/master/daily_case_updates/02-10-2020_1930.csv"

export default function getData() {
    return d3.csv(url)
      .then((raw_data) => {return console.log(transform(raw_data))})
}

function transform(data){
    let result = []
    let lookup_idx = {}
    let idx = 0

    data.forEach(element => {
        let iso_alpha_3 = CountryLookup[element["Country/Region"]]

        if (!(iso_alpha_3 in lookup_idx)) {
            let new_entry = {
                "id": iso_alpha_3,
                "name":  element["Country/Region"],
                "sum": parseInt(element["Confirmed"]),
                "color": "hsl(209, 70%, 50%)",
            }

            if (element["Province/State"]) {
                let child = {
                    "name": element["Province/State"],
                    "loc": parseInt(element["Confirmed"]),
                    "color": "hsl(209, 70%, 50%)"
                }
                new_entry["children"] = [child]
            }

            result.push(new_entry)
            lookup_idx[iso_alpha_3] = idx
            idx++;
        } 
        else {
            let entry = result[lookup_idx[iso_alpha_3]]

            let child = {
                "name": element["Province/State"],
                "loc": parseInt(element["Confirmed"]),
                "color": "hsl(209, 70%, 50%)"
            }
            
            entry["sum"] += child["loc"]
            entry["children"].push(child)
        }
    });
    return result
}