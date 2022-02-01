import React, { useState } from "react";
import DragDrop from "./uploadData";

// What are the valid files:
const config = {
    allowedFileFormats: ["image/jpeg", "image/jpg", "image/png", ".csv", "text/csv", "application/vnd.ms-excel", "text/plain"],
    fileSizeMBLimit: 10,
    filesLimit: 1
};

const FILE_UPLOADER_STATE = {
    INIT: "INIT",
    PROCESSING: "PROCESSING",
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE"
};

// This function should determin what actions can be performed on the DATA!!!!!
function FileUploader() {
    const [loaderState, setLoaderState] = useState(FILE_UPLOADER_STATE.INIT);
    // here we should call the appropriate actions
    function processDrop(files) {
        //Simulate async request for file upload
        setTimeout(() => {
            setLoaderState(FILE_UPLOADER_STATE.PROCESSING);
        }, 1000);
        setTimeout(() => {
            setLoaderState(FILE_UPLOADER_STATE.SUCCESS);
        }, 3000);
        console.log("FILE UPLOADER!")
        console.log(files)
    };
    return (
        <>
            {loaderState === FILE_UPLOADER_STATE.INIT && (
                <DragDrop 
                    processDrop={processDrop} 
                    config={config}
                >
                    <div>Drag and drop files here!</div>
                    <div>State machine based on file upload</div>
                </DragDrop>
            )}
            {loaderState === FILE_UPLOADER_STATE.PROCESSING && (
                <div className="drag-container">Processing...</div>
            )}
            {loaderState === FILE_UPLOADER_STATE.SUCCESS && (
                <div className="drag-container">File Upload done!</div>
            )}
            {loaderState === FILE_UPLOADER_STATE.FAILURE && (
                <div className="drag-container">
                    File Upload failed. Please try again!
                </div>
            )}
        </>
    );
};

export { FileUploader };