const sinon = require('sinon');
const userModel = require('./user');
const userService = require('../services/user');
const { expect } = require('chai');

describe('models/user.js', () => {
  let model;
  let req = {};
  let res = {
    header: sinon.spy(() => {})
  };

  beforeEach(() => {
    model = {};

    userModel(model);
  });

  it('should bind the correct methods', () => {
    expect(typeof model.list).to.equal('function');
  });

  it('list should throw an error if user service throws an error', async () => {
    const errorMessage = 'An error occurred';
    const error = new Error(errorMessage);

    sinon.stub(userService, 'list')
      .callsFake(() => Promise.reject(error));

    try {
      await model.list(req, res);
    } catch (e) {
      expect(e.message).to.equal(errorMessage);
    }

    userService.list.restore();
  });

  it('list should return the correct response and set the uptime header', async () => {
    const users = [
      {
        id: 1,
        name: 'Ed'
      },
      {
        id: 2,
        name: 'Lokesh'
      }
    ];

    sinon.stub(userService, 'list')
      .callsFake(() => Promise.resolve(users));

    const output = await model.list(req, res);

    expect(output).to.deep.equal([
      {
        id: 1,
        name: 'Ed'
      },
      {
        id: 2,
        name: 'Lokesh'
      }
    ]);

    expect(res.header.callCount).to.equal(1);
    expect(res.header.firstCall.args[0]).to.equal('uptime');

    userService.list.restore();
  });
});
