function handleRequest(callback, requestDetail) {
  requestDetail.requestOptions.headers = callback(
    Object.assign({}, requestDetail.requestOptions.headers),
    requestDetail
  );
}

function handleResponse(callback, requestDetail, responseDetail) {
  responseDetail.response.header = callback(
    Object.assign({}, responseDetail.response.header),
    requestDetail,
    responseDetail
  );
}

function ModifyHeader(callback) {
  return (requestDetail, responseDetail) => {
    if (responseDetail)
      handleResponse(callback, requestDetail, responseDetail);
    else
      handleRequest(callback, requestDetail);
  }
}

ModifyHeader.add = function (headers, force = false) {
  return ModifyHeader((rawHeaders) => {
    if (force)
      return Object.assign({}, rawHeaders, headers);

    return Object.assign({}, headers, rawHeaders);
  })
};

ModifyHeader.remove = function (headers) {
  return ModifyHeader((rawHeaders) => {
    let result = Object.assign({}, rawHeaders);

    for (let header of headers) {
      delete result[header];
    }

    return result;
  });
};

module.exports = ModifyHeader;
