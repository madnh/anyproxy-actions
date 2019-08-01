const { getResponse } = require('../helpers');

const defaultOptions = {
  delay: 0,
  statusCode: 200,
  contentType: null,
  content: ''
};

module.exports = function (options) {
  if (typeof options === 'string' || typeof options === Buffer)
    options = { content: String(options) };

  options = Object.assign({}, defaultOptions, options);

  return (requestDetail, responseDetail) => {
    const response = getResponse(responseDetail);

    response.statusCode = options.statusCode;
    response.header['Content-Type'] = options.contentType || 'text/plain';
    response.body = options.content;

    const realResponse = {
      response: response
    };

    if (!options.delay)
      return realResponse;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(realResponse);
      }, options.delay);
    })
  }
};