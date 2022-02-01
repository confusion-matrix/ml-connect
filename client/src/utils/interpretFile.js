
// Determines how to interpret the file!!!
function interpretDrop(file) {
    const imageArray = ["image/jpeg", "image/jpg", "image/png"];
    const tableArray = [".csv", "text/csv", "application/vnd.ms-excel"];
    const textArray = ["text/plain"];

    // Use FileReader to get info from DragAndDrop DataTransfer Object
    const reader = new FileReader();
    const fileType = file.type;
    console.log(fileType);
    // First check what file type the file is:
    if (imageArray.includes(fileType)) {
        console.log("THIS IS AN IMAGE FILE")
        return "image";

        // Now call function that enables div as button
        // onClick() call function from appropriate TensorFlow related file.
    } else if (tableArray.includes(fileType)) {
        console.log("THIS IS A table FILE");
        if (fileType === ".xls" || fileType === ".xlsx") {
            // convert to .csv

        }
        // once file is .csv
        reader.readAsText(file);
        reader.onload(function (e) {
            var csv = e.target.result;
            var data = 0//$.csv.toArrays(csv);
            var html = "";
        })
        return "table"
    }
    else if (textArray.includes(fileType)) {
        console.log("THIS IS A TEXT FILE");
        return "text";
    }

    // reader.readAsDataURL(files[0]);
    // reader.onload = function(loadEvent) {
    //     setData(loadEvent.target.result);
    // };
};

export { interpretDrop };