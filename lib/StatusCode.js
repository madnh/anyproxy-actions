const { extendResponse } = require('../helpers');

module.exports = function (code) {
  return (requestDetail, responseDetail) => {

    return {
      response: extendResponse(responseDetail, { statusCode: code })
    }
  }
};
