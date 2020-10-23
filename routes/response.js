const sendError = (res, data, message, status)=> {
  var response = {
    message: message || 'Some error occurred while executing',
    status : 400,
    data   : data || {}
  };
  res.send(JSON.stringify(response));
}

const sendResponse = (res, msg, status, data)=> {
  var response = {
    message: msg || 'Successful',
    status : status || 200,
    data   : data || {}
  };
  res.send(JSON.stringify(response));
}
exports.sendResponse = sendResponse;
exports.sendError = sendError
