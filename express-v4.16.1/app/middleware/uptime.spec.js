const sinon = require('sinon');
const { expect } = require('chai');
const uptimeMiddleware = require('./uptime');

describe('middleware/uptime.js', () => {
  it('should set the uptime header on the request object and call next()', async () => {
    const req = { app: { locals: {} } };
    const res = {};
    const next = sinon.spy();

    uptimeMiddleware(req, res, next);

    expect(typeof req.app.locals.uptime).to.equal('number');
    expect(req.app.locals.uptime > 0).to.equal(true);

    expect(next.callCount).to.equal(1);
  });
});
