const cron = require('node-cron');
const lock = require('./lock');

cron.schedule('* * * * * *', async () => {
  console.log('Write your cronjob here... Running in every second.');
  const locked = await lock(__filename, async () => {});
});
