const Bull = require('bull');
const exampleProcess = require('./process/exampleProcess');

// --- Redis Configurations ---
const redisHost = process.env.REDIS_HOST || '127.0.0.1';
const redisPort = process.env.REDIS_PORT || '6379';
const redisPassword = process.env.REDIS_PASSWORD || '';

// --- Initialize the queue ---
const exampleQueue = new Bull('test-name', {
  redis: { port: redisPort, host: redisHost, password: redisPassword },
});

// --- Create the consumer ---
exampleQueue.process('test-process-1', exampleProcess);

// --- Create the producer ---
const sendData = (data) => {
  exampleQueue.add('test-process-1', data, {});
};

// --- Export the producer function and use in routes, controllers or cronjob ---
module.exports = sendData;
