/*
    1. ADD a way for a user to upload data, specefic files and such:
        - DRAG AND DROP FILES
        - UPLOAD FROM COMPUTER/FOLDERS/SINGLEFILES
    2. ONCE WE HAVE THAT DATA:
        - IDENTIFY FILE TYPE
        - CREATE FUNCTIONS TO CLEAN AND PARSE DATA
    3. ONCE DATA IS READY:
        - DEPENDING ON DATA SHOW APPLICABLE ML ALGORITHMS
    4. USER SELECTS PROCESS:
        - CALL THE TENSOR FLOW FUNCTION WITH PROVIDED DATA
    5. SHOW PREVIEW
        - ASK USER IF THEY WANT TO DOWNLOAD DATA
    6. STORE USER INPUT DATA IN DB

    START:
    FILE UPLOAD:
        - DRAG AND DROP CONTAINER: https://www.npmjs.com/package/react-drag-drop-files
            - EXTRA: Convert Drag and Drop to this code: https://codesandbox.io/s/github/dineshselvantdm/drag-drop-file-upload-react-hooks?file=/utils/drag-drop.js
        - UPLOAD FROM FILE EXPLORER: https://www.geeksforgeeks.org/file-uploading-in-react-js/
    TENSORFLOW:
        - 
        - 


*/

import React, { useState } from "react";
import TfMobilenet from "./tfImage";
import DragDrop from "./uploadData";
import "bootstrap/dist/css/bootstrap.css";

// utils
import { interpretDrop } from "../utils/interpretFile"
import TfSequentialModel from "./tfTable";

const config = {
    allowedFileFormats: ["image/jpeg", "image/jpg", "image/png", ".csv", "text/csv", "application/vnd.ms-excel", "text/plain"],
    fileSizeMBLimit: 10,
    filesLimit: 1
};

export default function UserPage() {
    const [fileType, setFileType] = useState("empty");
    const [file, setFile] = useState(null);

    function processDrop(file) {
        setFile(file[0]);
        setFileType(interpretDrop(file[0]));

    };

    return (
        <div>
            <h1  className='text-center py-3'>Let's anaylze some data!</h1>
            <h5 className='text-center'> drag and drop your files into the scanner below</h5>
            <div className='d-flex justify-content-center'>
                <div className='width py-3 hmmm'>
                <DragDrop processDrop={processDrop} config={config}>
                    <div className='text-center hmmm mx-3 px-3'>______________________________________________________________________________________________________________________________</div>
                </DragDrop>
                </div>
            </div>
            <div className="actionContainers row d-flex justify-content-around py-3">
                {/* Display result in new component <Results /> */}
                <div className='col-sm-8 col-md-3'>
                <TfMobilenet file={file} fileType={fileType} />
                </div>
                <div className='col-sm-8 col-md-3'>
                <TfSequentialModel file={file} fileType={fileType} />
                </div>
                <div className='col-sm-8 col-md-3'>
                <button id="text" className={`${fileType === "text" ? "action butt" : "noAction butt"}`} onClick={e => console.log(file)}>
                    It's a text file!
                </button>
                </div>
            </div>
            <div className="results py-3">
                {/* place results component here */}
            </div>
        </div>
    )
}
