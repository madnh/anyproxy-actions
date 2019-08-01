function getResponse(responseDetail) {
    return responseDetail && responseDetail.response || {
        status: 200,
        header: {},
        body: ''
    };
}

function extendResponse(responseDetail, newResponse) {
    return Object.assign({}, getResponse(responseDetail), newResponse);
}


function maxString(string, maxlength, charts = '......') {
    if (string.length <= maxlength)
        return string;

    return string.slice(0, maxlength) + charts;
}


module.exports = {
    getResponse,
    extendResponse,
    maxString
}