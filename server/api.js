const loopback = require('loopback');
const http = require('http');

const app = loopback();

app.start = (httpOnly) => {
  const port = app.get('port');
  const host = app.get('host');
  const server = http.createServer(app);

  server.listen(port, host, () => {
    app.emit('started');
  });

  return server;
};

module.exports = app;
