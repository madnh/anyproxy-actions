/**
 * @param {function|*} new_data
 * @return {function(*=): {requestData: *}}
 */
function ChangeRequestData(new_data) {
  return (requestDetail) => {
    return {
      requestData: new Buffer(typeof new_data === 'function' ? new_data(requestDetail) : new_data)
    }
  }
}

module.exports = ChangeRequestData;
