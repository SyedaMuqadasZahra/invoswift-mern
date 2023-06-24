/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
const CODES = {};

// TODO: Add dynamic returnCode
// TODO: error message from contants also cast messages to integer using +()
const BaseError = class extends Error {
  constructor(_message) {
    super(_message);
    this.statusCode = 500;
    this.code = 'ERR_SYSTEM';
    this.message = _message || 'Something went wrong, Please try again later';
  }
};

module.exports.BaseError = BaseError;

// ============== Default status code errors ============== //
module.exports.NotFoundError = class extends BaseError {
  constructor(_message) {
    super(_message);
    this.statusCode = 404;
  }
};

module.exports.BadRequestError = class extends BaseError {
  constructor(_message) {
    super(_message);
    this.statusCode = 400;
  }
};

module.exports.NotAuthenticatedError = class extends BaseError {
  constructor(_message) {
    super(_message);
    this.statusCode = 401;
    this.message = _message || 'You are not authenticated';
  }
};

module.exports.NotAuthorizedError = class extends BaseError {
  constructor(_message) {
    super(_message);
    this.statusCode = 403;
    this.message = _message || 'You are not authoirzed';
  }
};

module.exports.InvalidCredentialsError = class extends BaseError {
  constructor(_message) {
    super(_message);
    this.statusCode = 500;
    this.message =
      _message ||
      "We couldn't connect to the host with the credentials you provided. Please try again.";
  }
};
