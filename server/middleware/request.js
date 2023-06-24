const fs = require('fs');
const morgan = require('morgan');

const path = './logs/';
const fileName = `${new Date()
  .toLocaleDateString()
  .toLowerCase()
  .split('/')
  .join('_')}_request.log`;

const accessLogStream = fs.createWriteStream(`${path}${fileName}`, {
  flags: 'a',
});

const logger =
  process.env.REQUEST_LOG === '1'
    ? morgan('combined', { stream: accessLogStream })
    : morgan('combined');

const requestLogs = (req, res, next) => {
  logger(req, res, () => req);
  next();
};

module.exports = requestLogs;
