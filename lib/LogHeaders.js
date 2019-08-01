module.exports = (requestDetail, responseDetail) => {
  const isResponse = !!responseDetail;

  console.log('--- Headers of', isResponse ? 'Response' : 'Request');

  if (isResponse)
    console.log(responseDetail.response.header);
  else
    console.log(requestDetail.requestOptions.headers);

  return null;
};
