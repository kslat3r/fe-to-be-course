const sinon = require('sinon');
const { expect } = require('chai');
const server = require('../server');
const userService = require('./user');

describe('services/user.js', () => {
  it('list should return correct response', async () => {
    const stub = [
      {
        id: 1,
        name: 'Ed'
      },
      {
        id: 2,
        name: 'Lokesh'
      }
    ];

    sinon.stub(server.dataSources.users, 'listDS')
      .callsFake(() => Promise.resolve(stub));

    const users = await userService.list();

    expect(users).to.deep.equal(stub);
  });
});
