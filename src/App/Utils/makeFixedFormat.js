
function makeFixedFormat(val) {

    const formattedStr = (val.toString().length === 1 ? '0'+val.toString() : val.toString());
    
    return formattedStr;
}

export default makeFixedFormat;