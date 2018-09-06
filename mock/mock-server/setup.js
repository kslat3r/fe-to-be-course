const { mockServerClient } = require('mockserver-client');
const mocks = require('./mocks');

const setup = (config) => {
  const client = mockServerClient(config.hostname, config.port);

  client.setDefaultHeaders({});

  const stubsToP = stubs => {
    return stubs.map(stub => {
      const httpRequest = {
        method: stub.request.method,
        path: stub.request.path,
        body: stub.request.body
      };

      if (stub.request.headers) {
        httpRequest.headers = Object.keys(stub.request.headers).map((name) => ({
          name,
          values: Array.isArray(stub.request.headers[name]) ? stub.request.headers[name] : [stub.request.headers[name]]
        }));
      }

      if (stub.request.query) {
        httpRequest.queryStringParameters = Object.keys(stub.request.query).map((name) => ({
          name,
          values: [stub.request.query[name]]
        }));
      }

      const httpResponse = {
        statusCode: stub.response.statusCode,
        body: typeof stub.response.body === 'object' ? JSON.stringify(stub.response.body) : stub.response.body
      };

      if (stub.response.headers) {
        httpResponse.headers = Object.keys(stub.response.headers).map((name) => ({
          name,
          values: [stub.response.headers[name]]
        }));
      }

      return client.mockAnyResponse({
        httpRequest,
        httpResponse,
        times: {
          unlimited: true
        }
      })
        .then(() => {
          console.log(`Stub ${httpRequest.method} ${config.hostname}${httpRequest.path} created`);
        });
    });
  };

  const handleError = err => {
    console.error(err);
    process.exit(1);
  };

  client.reset()
    .then(() => Promise.all(stubsToP(config.stubs)))
    .catch(handleError);
};

mocks.forEach(config => setup(config));
