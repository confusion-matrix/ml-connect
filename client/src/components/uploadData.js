/*
    Probably best to merge these function together....

    once file us uploaded return data ?
        - Should this be processed in the user page or a different component ?

    when selected:
        - show user the file information:
            - file type
            - size
            - name

    Resources:
    https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/files
    https://developer.mozilla.org/en-US/docs/Web/API/FileReader

*/

import React, { useState, useRef } from "react";
import get from "lodash/get";
import { fileValidators, preventBrowserDefaults } from "../utils/fileValidators"

const  DragDrop = ({ processDrop, children, config }) => {
    let [dragOverlay, setDragOverlay] = useState(false);
    const [data, setData] = useState(false);
    const [error, setError] = useState(false);

    let dragCounter = useRef(0);

    // When dragging prevent changes
    function handleDrag(e) {
        preventBrowserDefaults(e);
    };

    // When it's hovering over overlay add CSS
    function handleDragIn(e) {
        preventBrowserDefaults(e);
        dragCounter.current++;

        if (get(e, "dataTransfer.items.length") > 0) {
            setDragOverlay(true);
        }
    };
    
    // Return to normal when dragging out
    function handleDragOut(e) {
        preventBrowserDefaults(e);
        dragCounter.current--;

        if (dragCounter.current === 0) {
            setDragOverlay(false);
        };

    };

    // When we drop the file, determine if it's valid and
    // and what kind of file it is.
    function handleDrop(e) {
        // Use lodash/get to determine if the incoming parameter variable is of file type
        // if it is, then remove overlay and reset values
        const files = get(e, "dataTransfer.files");
        preventBrowserDefaults(e);
        setDragOverlay(false);
        setError(false);
        dragCounter.current = 0;
        
        // Validate files
        const { isValidFile, errVal } = fileValidators(files, config);
        if (!isValidFile) {
            if (errVal) {
                setError(errVal)
            }
            return false;
        }

        // If we are here that means the file passed validation
        // Read file
        // fileReader(files);
        // Call this after we have read the file!
        processDrop(files);
    };

    const imageArray = ["image/jpeg", "image/jpg", "image/png"];
    const tableArray = [".csv", "text/csv", "application/vnd.ms-excel"];
    const textArray = ["text/plain"];
    // Determines how to interpret the file!!!
    function fileReader(files) {
        // Use FileReader to get info from DragAndDrop DataTransfer Object
        const reader = new FileReader();
        const fileType = files[0].type;
        console.log(fileType);
        // First check what file type the file is:
        if (imageArray.includes(fileType)) {
            console.log("THIS IS AN IMAGE FILE")
            
            reader.onload = function (e) {
                console.log("image read!");
                setData(reader.result);
                
            };
            return reader.readAsDataURL(files[0]);
            
            
            

            // Now call function that enables div as button
            // onClick() call function from appropriate TensorFlow related file.
        } else if (tableArray.includes(fileType)) {
            console.log("THIS IS A CSV FILE");
            reader.readAsText(files[0]);
            reader.onload(function (e) {
                var csv = e.target.result;
                var data = 0//$.csv.toArrays(csv);
                var html = "";
            })
        }
        else if (textArray.includes(fileType)) {
            console.log("THIS IS A TEXT FILE");
        
        }

        // reader.readAsDataURL(files[0]);
        // reader.onload = function(loadEvent) {
        //     setData(loadEvent.target.result);
        // };
    };

    // Overlay logic!
    const dragOverlayClass = dragOverlay ? "overlay" : "";

    return (
        <div>
            {error && <p className="error">{error}</p>}
            <div
                className={`drag-container ${dragOverlayClass}  d-flex align-items-center justify-content-center`}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {data && <img alt="" src={data} />}
                {children}
                <div className="button-wrapper">
                    {data && <button onClick={setData(false)}>Remove File</button>}
                </div>
            </div>
        </div>
    );

};

export default DragDrop;






// Add drag and drop file
// function UploadData1() {
//     const fileTypes = ["png", "jpg", ".csv"];
//     // set default state
//     const [file, setFile] = useState(null);

//     // set new state
//     const handleChange = (file) => {
//         setFile(file);
//     };

//     const handleSubmission = () => {
//         console.log(file.name);
//         processData(file)
//     };

//     return (
//         <div className="DragAndDropContainer">
//             <h3>Drag and drop your file here</h3>
//             <FileUploader handleChange={handleChange} name="file" types={fileTypes} maxSize="5" />
//             <p>{file ? `File name: ${file.name}` : "No file uploaded yet"}</p>
//             <button onClick={handleSubmission}>Submit</button>
//         </div>
//     );
// };


// // Add file through file explorer; also how to send file to server
// function UploadFileExplorer() {
//     const [file, setFile] = useState(null);
//     // const [isFileSelected, setIsFileSelected] = useState(false);


//     const changeHandler = (e) => {
//         setFile(e.target.files[0]);
//         // setIsFileSelected(true);
//     };

//     // use this function to upload transformed files to user database
//     const handleSubmission = () => {

//     };

//     return (
//         <div>
//             <input type="file" name="file" onChange={changeHandler} />
//             <div>
//                 <button onClick={handleSubmission}>Submit</button>
//                 <p>{file ? `File name: ${file.name}` : "No file uploaded yet"}</p>
//             </div>
//         </div>
//     );
// };