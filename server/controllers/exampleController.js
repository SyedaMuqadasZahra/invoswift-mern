const { BadRequestError, BaseError } = require('../errors/error');

module.exports = {
  async testErrorHandlerMethod(req, res, next) {
    try {
      if (Object.keys(req.body).length !== 0) {
        const { name } = req.body;
        const { email } = req.body;
        res.status(200).json({
          fullName: name,
          emailAddress: email,
        });
      } else {
        next(new BadRequestError('Request Body Not Found!!!'));
      }
    } catch (err) {
      next(new BaseError());
    }
  },

  async healthCheck(req, res, next) {
    try {
      res.status(200).send({ message: 'Successfull' });
    } catch (err) {
      next(new BaseError());
    }
  },
};
