const { getResponse } = require('../helpers');

function ModifyResponseBody(...callbacks) {
  return (requestDetail, responseDetail) => {

    if(!responseDetail.response){
      throw new Error('ResponseDetail.response is missing')
    }

    const response = getResponse(responseDetail);
    const body = String(response.body);

    for (let callback of callbacks) {
      body = callback(body, response, responseDetail);
    }

    response.body = body;

    return {
      response: response
    };
  }
}

ModifyResponseBody.append = function (content) {
  const contentStr = String(content);

  return function (body) {
    return body + contentStr;
  }
};


ModifyResponseBody.prepend = function (content) {
  const contentStr = String(content);

  return function (body) {
    return contentStr + body;
  }
};

ModifyResponseBody.replace = function (search, replace) {
  return function (body) {
    return String(body).replace(search, replace);
  }
};


ModifyResponseBody.remove = function (search) {
  return function (body) {
    return String(body).replace(search, '');
  }
};


module.exports = ModifyResponseBody;

