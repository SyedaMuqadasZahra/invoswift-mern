const responseHandler = function (data, req, res) {
  res.status(data.statusCode).send(data);
  return false;
};

module.exports = responseHandler;
