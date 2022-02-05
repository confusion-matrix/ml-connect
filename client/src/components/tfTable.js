import React, { useState, useEffect } from "react";

import "@tensorflow/tfjs-backend-webgl";
// import only what we need...
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import * as Plotly from "plotly.js-dist";
// HERE we will build a Nueral Network model to create predictions based
// on user inputs...
/*
    1. Grab the file and process the column lables
    2. Let user pick what columns they want
    3. Run the model
    4. Once completed, let user enter values for desired prediction
*/
function TfSequentialModel({ file, fileType }) {

    // ============================ MODEL/DATA PROCESSING ===============================
    const [showResults, setShowResults] = useState(false)
    const [showColumns, setShowColumns] = useState(false);
    const [showPrediction, setShowPrediction] = useState(false);
    const [columns, setColumns] = useState(null);

    const [selectedFeatures, setSelectedFeatures] = useState([]);
    // const [selectedPrediction, setSelectedPrediction] = useState(null);
    let selectedPrediction = "";

    async function getData() {
        let result = [];
        let colIndex = [];
        let categoricalFeatures = [];
        let categoricalFeaturesTemp = [];
        let categoricalFeaturesCount = [];
        let categoryIndex = [];
        let featureList;
        let data;

        const reader = new FileReader();
        reader.onload = (e) => {
            featureList = e.target.result.split("\n", 1)[0].split(",");
            data = e.target.result.split("\n");
            let dataSample = data[1].split(",");
            // 
            
            for (var i = 0; i < selectedFeatures.length; i++) {
                if (featureList.includes(selectedFeatures[i])) {
                    colIndex.push(featureList.indexOf(selectedFeatures[i]));
                    if (isNaN(dataSample[colIndex[i]])) {
                        categoricalFeatures.push(selectedFeatures[i]);
                        categoryIndex.push(colIndex[i]);
                    };
                };
            };

            colIndex.sort(function(a, b) {
                return a - b;
            });
            let tempArr = selectedFeatures;
            let index = tempArr.indexOf(selectedPrediction);
            tempArr.splice(index, 1);
            index = colIndex.indexOf(featureList.indexOf(selectedPrediction));
            tempArr.splice(index, 0, selectedPrediction);

            setSelectedFeatures(tempArr);

            for (let j = 1; j < 100; j++) {
                let obj = {};
                // here we get the first row
                let currentLine = data[j].split(",");
                // iterate over row, stop at target
                for (let k = 0, i = 0, s = 0; k < currentLine.length; k++) {
                    if (colIndex.includes(k)) {
                        // fill array with inital data
                        if (categoricalFeaturesTemp.length !== categoricalFeatures.length && categoryIndex.includes(k)) {
                            // first create array to house the data, if it's new index push array into
                            categoricalFeaturesTemp.push([currentLine[k]]);
                            // count also has to be 2d array
                            categoricalFeaturesCount.push([1]);
                        } else if (categoryIndex.includes(k) && !categoricalFeaturesTemp[s].includes(currentLine[k])) {
                            // add new values to sub arrays
                            categoricalFeaturesTemp[s].push(currentLine[k]);
                            categoricalFeaturesCount[s].push(1);
                            s++;
                        } else if (categoryIndex.includes(k)) {
                            categoricalFeaturesCount[s][categoricalFeaturesTemp[s].indexOf(currentLine[k])] += 1;
                            s++;
                        }
                        obj[selectedFeatures[i]] = currentLine[k];
                        i++;
                    };
                };

                // create array of objects
                result.push(obj);
            };

            // print category info
            /*
            console.log("Category Info:")
            console.log(categoricalFeaturesCount);
            console.log(categoricalFeaturesTemp);
            console.log(categoricalFeatures);
            */

            // print function values
            /*
            console.log("PRINTING FUNCTION VALUES: ");
            console.log(result);
            console.log(selectedFeatures);
            console.log(categoricalFeaturesTemp);
            console.log(categoricalFeaturesCount);
            */
            console.log(result);
            const [xTrain, xTest, yTrain, yTest] = createDataSet(result, selectedFeatures, categoricalFeatures, categoricalFeaturesCount, categoricalFeaturesTemp, 0.1);

            linearRegressionModel(xTrain, yTrain, xTest, yTest);
        };
        reader.readAsText(file)

    };

    async function modelPlot(model, xTest, yTest) {
        const trueValues = yTest.dataSync();
        const lmPreds = await model.predict(xTest).dataSync();
        renderPredictions(trueValues, lmPreds);
    }

    function createDataSet(data, features, categoricalFeatures, categoricalCount, categoricalFeaturesValues, testSize) {
        // process X and Y; remove Y from X
        let index = features.indexOf(selectedPrediction)
        features.splice(index, 1);

        // create set for identification
        let categoricalFeaturesSet = new Set(categoricalFeatures);
        const categoryCount = {}
        for (var i = 0; i < categoricalFeatures.length; i++) {
            categoryCount[categoricalFeatures[i]] = categoricalCount[i].length;
        }

        // map dataset
        const X = data.map(obj =>
            features.flatMap(element => {
                if (categoricalFeaturesSet.has(element)) {
                    return oneHot(!obj[element] ? 0 : obj[element], categoryCount[element], categoricalFeaturesValues[categoricalFeatures.indexOf(element)]);
                };
                return !obj[element] ? 0 : parseInt(obj[element]);
            })
        );

        // normalize; return tensor
        const X_t = normalize(tf.tensor2d(X));
        // get y column
        const y = tf.tensor(data.map(obj => (!obj[selectedPrediction] ? 0 : parseInt(obj[selectedPrediction]))));

        const splitIdx = parseInt((1 - testSize) * data.length, 10);

        const [xTrain, xTest] = tf.split(X_t, [splitIdx, data.length - splitIdx]);
        const [yTrain, yTest] = tf.split(y, [splitIdx, data.length - splitIdx]);

        return [xTrain, xTest, yTrain, yTest];
    };

    function normalize(tensor) {
        // normalized = (value − minimum) / (max − minimum)
        return tf.div(tf.sub(tensor, tf.min(tensor)), tf.sub(tf.max(tensor), tf.min(tensor)))
    };

    function oneHot(value, categoryCount, categoryValues) {
        // convert each unique string value to an integer representation
        // one hot encoder then creates a binary array representation of the value
        value = categoryValues.indexOf(value);
        return Array.from(tf.oneHot(value, categoryCount).dataSync());
    };

    async function linearRegressionModel(xTrain, yTrain, xTest, yTest) {
        console.log("xTRAIN");
        console.log(xTrain.shape[1])
        const model = tf.sequential({
            layers: [
                tf.layers.dense({ inputShape: [xTrain.shape[1]], units: xTrain.shape[1], activation: "sigmoid" }),
                tf.layers.dense({ units: 1 })
            ]
        });

        model.compile({
            optimizer: tf.train.sgd(),
            loss: tf.losses.meanSquaredError,
            metrics: ['mse']
        });

        await model.fit(xTrain, yTrain, {
            batchSize: 32,
            epochs: 50,
            shuffle: true,
            validationSplit: 0.1,
            // callbacks: tfvis.show.fitCallbacks(
            //         {name: "Training Performance"},
            //         ["loss", "mse"],
            //         { height: 200, callbacks: ['onEpochEnd'] }
            //     )
        });
        console.log("Model done");
        modelPlot(model, xTest, yTest);
    };

    // ========================= PLOT FUNCTIONS ==============================

    const renderPredictions = (trueValues, lmPredictions) => {
        setShowResults(true)
        var trace = {
            x: [...Array(trueValues.length).keys()],
            y: trueValues,
            mode: "lines+markers",
            type: "scatter",
            name: "true",
            opacity: 0.5,
            marker: {
                color: "dodgerblue"
            }
        };

        var lmTrace = {
            x: [...Array(trueValues.length).keys()],
            y: lmPredictions,
            name: "pred",
            mode: "lines+markers",
            type: "scatter",
            opacity: 0.5,
            marker: {
                color: "forestgreen"
            }
        };

        console.log("Plotting...");
        Plotly.newPlot("predictions", [trace, lmTrace], {
            title: "Predictions",
            yaxis: { title: "Price" }
        });
    };

    // ===================== USER INPUT FUNCTIONS =========================
    
    function featureSelect(inputFeature) {
        let tempArr = selectedFeatures;
        tempArr.push(inputFeature);
        setSelectedFeatures(tempArr);
    };

    function predictSelect(inputPrediction) {
        let tempArr = selectedFeatures;
        tempArr.push(inputPrediction);
        setSelectedFeatures(tempArr);
        // setSelectedPrediction(inputPrediction);
        selectedPrediction = inputPrediction;
        setShowPrediction(false);
        getData();
    };

    function doneSelectingFeatures() {
        if (selectedFeatures.length < 1) {
            alert("Pick at least 1 column");
            return;
        };
        setShowColumns(false);
        setShowPrediction(true);
    };

    function makeColButtons(col) {
        return (
            <button className='butt2 btn-danger m-1' key={col} onClick={() => featureSelect(col)}>
                {col}
            </button>
        );
    };

    function makeColButtonsForPrediction(col) {
        return (
            <button key={col} onClick={() => predictSelect(col)}>
                {col}
            </button>
        );
    };

    function SelectColumns() {
        return (
            <div>
                <p>
                    Select data you want to use to create your model
                    Click Done when you're finished<br></br>
                </p>
                {columns.map(makeColButtons)}
                <div className="d-flex justify-content-center">
                <button className='butt2' onClick={() => doneSelectingFeatures()}>
                    Done
                </button>
                </div>
            </div>
        )
    };

    function Prediction() {
        return <div>
            <p>
                Now select value you want to predict
            </p>
            {columns.map(makeColButtonsForPrediction)}
        </div>
    }

    // let user select columns
    function getColumns() {
        let labels;
        let labelArray;
        const reader = new FileReader();

        reader.onload = (e) => {
            labels = e.target.result.split("\n", 1);
            labelArray = labels[0].split(",");
            setColumns(labelArray.filter(label => typeof label === "string" && label !== ""));
            setShowColumns(true);
        }
        reader.readAsText(file)

        if (fileType === ".xls" || fileType === ".xlsx") {
            // convert excel sheet to .csv
        };
    };

    // clean during encoding; convert empty values to 0
    function cleanData(data) {
        const cleanedData = data.map(element => ({
            x: element[0],
            y: element[1]
        })).filter(element => (element.x != null && element.y != null));

        return cleanedData;
    };

   
    function PrintOut(){
        return(
            <div className="paper2" >
                 
            <div id="predictions" ></div>
            </div>
        )
    }

    return (
        <div className="table">
            <button id="table" className={`${fileType === "table" ? "action butt" : "noAction butt"}`} onClick={e => getColumns()}>
                    It's a table!
            </button>
                    {showColumns ? <SelectColumns /> : null}
                    {showPrediction ? <Prediction /> : null}
            {showResults ? <PrintOut/> : null}
        </div>
    );
}

export default TfSequentialModel;