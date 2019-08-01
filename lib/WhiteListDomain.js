const URL = require('url').URL;
const { maxString } = require('../helpers');

const defaultCode = 503;
const defaultMessage = '503 Service Unavailable - by WhiteListDomain.org';

function response(requestDetail, code, content) {
  console.log(requestDetail.requestOptions.method, maxString(requestDetail.url, 150), ' ==> Blocked');

  return {
    response: {
      statusCode: code,
      header: { 'Content-Type': 'text/plain' },
      body: content
    }
  };
}

module.exports = function (domains, code = defaultCode, content = defaultMessage) {
  const whiteListCached = {};
  const blocked = {};

  for (let domain of domains) {
    whiteListCached[domain] = true;
  }

  return (requestDetail) => {
    const url = requestDetail.url;

    if (!blocked.hasOwnProperty(url)) {
      const urlDetail = new URL(url);

      blocked[url] = !whiteListCached[urlDetail.hostname];
    }

    if (blocked[url])
      return response(requestDetail, code, content);

    return null;
  }
};
