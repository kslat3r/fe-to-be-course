const boot = require('loopback-boot');
const api = require('./api');

boot(api, __dirname, (err) => {
  if (err) {
    throw err;
  }

  api.start();
});

module.exports = api;
