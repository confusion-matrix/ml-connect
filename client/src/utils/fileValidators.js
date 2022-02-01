function fileValidators(files, config) {
    const { allowedFileFormats, fileSizeMbLimit, fileLimit } = config;
    const { length } = files;
    const { size, type } = files[0];

    let err = false;

    let result = {
        isValidFile: false,
        errVal: err
    };

    if (length === 0) {
        return result;
    } else if (length > fileLimit) {
        err = fileLimit > 1 ? `Only ${fileLimit} files are allowed` : "Only one file is allowed";
    } else if (!allowedFileFormats.includes(type)) {
        err = "Invalid file format!";
    } else if (size / 1024 / 1024 > fileSizeMbLimit) {
        err = "File size exceeds limit!";
    } else {
        result.isValidFile = true;
    }
    result.errVal = err;

    return result;
};

function preventBrowserDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
};

export { fileValidators, preventBrowserDefaults };