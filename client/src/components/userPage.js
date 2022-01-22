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
        - UPLOAD FROM FILE EXPLORER: https://www.geeksforgeeks.org/file-uploading-in-react-js/
    TENSORFLOW:
        - 
        - 


*/

import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FileUploader } from "react-drag-drop-files";

// Add drag and drop file
const fileTypes = ["JPG", "PNG", "txt", "docx"];

function UploadDragDrop() {
    const [file, setFile] = useState(null);
    
    const handleChange = (file) => {
        setFile(file);
    };
    return (
        <div className="DragAndDropContainer">
            <h2>Drag and drop your files here</h2>
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            <p>{file ? `File name: ${file.name}`: "No file uploaded yet"}</p>
        </div>
    );
}
// Add file through file explorer; also how to send file to server
function UploadFileExplorer() {
    const [file, setFile] = useState(null);
    const [isFileSelected, setIsFileSelected] = useState(false);


    const changeHandler = (e) => {
        setFile(e.target.files[0]);
        setIsFileSelected(true);
    };

    // use this function to upload transformed files to user database
    const handleSubmission = () => {

    };

    return (
        <div>
            <input type="file" name="file" onChange={changeHandler} />
            <div>
                <button onClick={handleSubmission}>Submit</button>
                <p>{file ? `File name: ${file.name}`: "No file uploaded yet"}</p>
            </div>
        </div>
    )
}


// export default UploadDragDrop;
// export default UploadFileExplorer