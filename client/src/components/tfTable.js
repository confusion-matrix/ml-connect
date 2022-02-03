import React, { useState, useEffect } from "react";

import "@tensorflow/tfjs-backend-webgl";

// HERE we will build a Nueral Network model to create predictions based
// on user inputs...
/*
    1. Grab the file and process the column lables
    2. Let user pick what columns they want
    3. Run the model
    4. Once completed, let user enter valus for desired prediction
*/
function TfSequentialModel({file, fileType}) {
    const [showColumns, setShowColumns] = useState(false);

    // Only let it get numerical data, ignore categorical data
    function csvToJSON(xAndY) {
        let lines = file.split("\n");
        let result = [];

        for (let i = 1; i < lines.length; i++) {
            let obj = {};
            let currentLine = lines[i].split(",");

            for (let j = 0; j < xAndY.length; j++) {
                obj[xAndY[j]] = currentLine[j];
            };

            result.push(obj);
        }

        cleanData(JSON.stringify(result));
    }
    let xAndY = []
    function colSelected(col) {
            xAndY.push(col);
        if (xAndY.length === 2) {
            // user selected two columns
            setShowColumns(false);
            csvToJSON(xAndY);
        }
    }

    // let user select columns
    function SelectColumns(file) {
        if (fileType === ".xls" || fileType === ".xlsx") {
            // convert excel sheet to .csv
        }
        let headerRow = file.split("\n", 1);
        let colNames = headerRow[0].split(",");

        return colNames.map((col, i) => {
            return (<div className="columns">
                        <button onClick={colSelected(col)}>
                            {col}
                        </button>
                    </div>
            )
        })
    }

    function cleanData(userX, userY) {
        const data = csvToJSON(file)
        const cleanedData = data.map(element => ({
            x: element[userX],
            y: element[userY]
        })).filter(element => (element.x != null && element.y != null));

        return cleanedData;
    }



    return (
        <div className="table">
            <button id="table" className={`${fileType === "table" ? "noAction butt" : "noAction butt"}`} onClick={e => setShowColumns(true)}>
                    It's a table!
            </button>
            {showColumns ? <SelectColumns /> : null}
        </div>
    );
}

export default TfSequentialModel;