// Determines how to interpret the file!!!
function interpretDrop(file) {
    const imageArray = ["image/jpeg", "image/jpg", "image/png"];
    const tableArray = [".csv", "text/csv", "application/vnd.ms-excel"];
    const textArray = ["text/plain"];

    // Use FileReader to get info from DragAndDrop DataTransfer Object
    const reader = new FileReader();
    const fileType = file.type;
    // First check what file type the file is:
    if (imageArray.includes(fileType)) {
        return "image";

        // Now call function that enables div as button
        // onClick() call function from appropriate TensorFlow related file.
    } else if (tableArray.includes(fileType)) {
        return "table"
    }
    else if (textArray.includes(fileType)) {
    }

    // reader.readAsDataURL(files[0]);
    // reader.onload = function(loadEvent) {
    //     setData(loadEvent.target.result);
    // };
};

export { interpretDrop };