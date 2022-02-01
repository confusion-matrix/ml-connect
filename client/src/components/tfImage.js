import React, { useState, useEffect } from "react";

import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs-backend-webgl";

function TfMobilenet({ file, fileType }) {
    console.log("Called from outer FILE");
    const [isModelLoading, setIsModelLoading] = useState(false);
    const [model, setModel] = useState(null);
    const [results, setResults] = useState([]);

    async function loadModel() {
        console.log("LOADING MODEL")
        setIsModelLoading(true);
        try {
            const model = await mobilenet.load();
            setModel(model);
            setIsModelLoading(false);
        } catch (err) {
            console.log(err);
            setIsModelLoading(false);
        }
    }

    useEffect(function () {
        loadModel()
    }, []);

    async function identify(image) {
        console.log("Identifying")
        const img = new Image();
        img.src = URL.createObjectURL(image);
        await img.decode();
        console.log(img.height)
        const result = await model.classify(img);
        setResults(result);
    }

    if (isModelLoading) {
        return <h2>Loading model...</h2>
    }

    return (
        <div className="image">
            <div id="image" className={`${fileType === "image" ? "action" : "noAction"}`} onClick={e => identify(file)}>
                this is an image
            </div>
            {results.map(function (result, index) {
                return (
                    <div className="result" key={result.className}>
                        <span className="name">{result.className}</span>
                        <span className="confidence">Confidence Level: {(result.probability * 100)}% {index === 0 &&
                            <span className="bestGuess">Best Guess</span>}
                        </span>
                    </div>
                )
            })}
        </div>
    );

};

export default TfMobilenet;