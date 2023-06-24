const express = require('express');

const router = express.Router();
const controllers = require('../controllers/exampleController');
const responseHandler = require('../middleware/errorHandler');
const sendData = require('../queues/exampleQueue');

router.get('/', (req, res, _next) => {
  res.send('respond with a resource');
});

router.get('/test-route', controllers.healthCheck, responseHandler);

router.post('/test-queue', async (req, res) => {
  const data = {
    title: req.body.title || 'This is title.',
    body: req.body.body || 'This is the message body.',
  };
  // --- Call the queue and pass data ---
  await sendData(data);
  res.json({
    status: true,
    msg: 'Queue implemented successfully.',
  });
});

module.exports = router;
