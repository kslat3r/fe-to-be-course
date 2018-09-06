const sinon = require('sinon');
const { expect } = require('chai');
const requestValidation = require('./request-validation');

describe('components/request-validation.js', () => {
  it('should throw an exception if the swagger file cannot be loaded', async () => {
    try {
      await requestValidation({}, {
        path: 'foo'
      });
    } catch (err) {
      expect(err.message).to.contain('ENOENT: no such file or directory');
    }
  });

  it('should add the correct middleware', async () => {
    const app = {
      middleware: sinon.spy()
    };

    await requestValidation(app, {
      path: 'definitions/api.yaml'
    });

    expect(app.middleware.callCount).to.equal(2);
    expect(app.middleware.firstCall.args[0]).to.equal('routes:before');
    expect(app.middleware.secondCall.args[0]).to.equal('routes:before');
  });
});
