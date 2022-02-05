import React, { useState, useEffect } from "react";

import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs-backend-webgl";
import PrintOut from "./printOut";

function TfMobilenet({ file, fileType }) {
    const [showResults, setShowResults] = useState(false)
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
        setShowResults(true)
        setResults(result);
        console.log(result)

    }

    function PrintOut(){
        return(
            <div className="paper">
                 {results.map(function (result, index) {
                return (
                    
                    <div className="result col-12" key={result.className}>
                        
                        <div className="name">{result.className}</div>
                        <div className="confidence">Confidence Level: {(result.probability * 100)}% {index === 0 &&
                            <div className="bestGuess">Best Guess</div>}
                        </div>
                    </div>
                )
            })}
            
            </div>
        )
    }

    if (isModelLoading) {
        return <h2>Loading model...</h2> 
    }

    return (

        <div className="image">
            <button id="image" className={`${fileType === "image" ? "action butt" : "noAction butt"}`} onClick={e => identify(file)}>
                It's an image!
            </button >
            {showResults ? <PrintOut/> : null}
            
            </div>
        
    );

};

export default TfMobilenet;