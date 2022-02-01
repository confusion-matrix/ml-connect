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
            <h1 style={{ textAlign: "center" }}>User Page ...</h1>
            <div style={{ margin: "auto", width: "50%" }}>
                <DragDrop processDrop={processDrop} config={config}>
                    <div>Drag and drop files here!</div>
                </DragDrop>
            </div>
            <div className="actionContainers">
                <TfMobilenet id="image" file={file} fileType={fileType}>
                
                </TfMobilenet>
                {/* <div id="image" className={`${fileType === "image" ? "action" : "noAction"}`} onClick={e => identify(file)}>
                    this is an image
                </div> */}
                {/* Change these to components */}
                <TfSequentialModel id="table" file={file} fileType={fileType}>

                </TfSequentialModel>
                {/* <div id="table" className={`${fileType === "table" ? "noAction" : "noAction"}`} onClick={e => console.log(file)}>
                    this is a table
                </div> */}
                <div id="text" className={`${fileType === "text" ? "action" : "noAction"}`} onClick={e => console.log(file)}>
                    this is a text file
                </div>
            </div>
        </div>
    )
}
