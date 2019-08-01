const url = require('url');


function parseTargetFromURL(target_url) {
  const urlDetail = url.parse(target_url);

  const target = {};

  if (urlDetail.protocol) {
    target.protocol = urlDetail.protocol.endsWith(':') ? urlDetail.protocol.slice(0, -1) : urlDetail.protocol;
  }

  if (urlDetail.hostname)
    target.hostname = urlDetail.hostname;

  if (urlDetail.port)
    target.port = urlDetail.port;

  if (urlDetail.path)
    target.path = urlDetail.path;

  return target;
}

function ChangeTarget(target) {
  if (typeof target === "string")
    target = parseTargetFromURL(target);

  target = Object.assign({
    protocol: null,
    hostname: null,
    port: null,
    path: null,
    method: null,
  }, target);

  return (requestDetail) => {
    const requestOptions = requestDetail.requestOptions;

    if (target.protocol !== requestDetail.protocol)
      requestDetail.protocol = target.protocol;

    if (target.hostname !== requestDetail.hostname) {
      requestOptions.hostname = target.hostname;

      if (requestOptions.headers.Host)
        requestOptions.headers.Host = target.hostname;
    }

    if (target.port !== requestDetail.port)
      requestOptions.port = target.port;

    if (target.path !== requestOptions.path)
      requestOptions.path = target.path;

    if (target.method !== requestOptions.method)
      requestOptions.method = target.method;

    return requestDetail;
  }
}

ChangeTarget.protocol = function (protocol) {
  return ChangeTarget({protocol: protocol});
};

ChangeTarget.hostname = ChangeTarget.redirect = function (hostname) {
  return ChangeTarget({hostname: hostname});
};

ChangeTarget.port = function (port) {
  return ChangeTarget({port: port});
};

ChangeTarget.path = function (path) {
  return ChangeTarget({path: path});
};
ChangeTarget.method = function (method) {
  return ChangeTarget({method: method});
};


module.exports = ChangeTarget;
