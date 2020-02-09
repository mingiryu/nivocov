import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Tabletop from 'tabletop';
import CountryLookup from './components/CountryLookup'

const publicSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1zjiFrVCfq84WFWJLzvG8dUshNtq-kET2IX0NlNt7CA8/edit?usp=sharing";

function init() {
    Tabletop.init({
        key: publicSpreadsheetUrl,
        callback: showInfo,
        simpleSheet: true,
        debug: true
    })
}

function showInfo(data, tabletop) {
    // do something with the data
    console.log(tabletop.foundSheetNames);

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
    console.log(result)
}

//initialise and kickstart the whole thing.
init()

ReactDOM.render( < App / > , document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();