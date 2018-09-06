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
      .callsFake(() => stub);

    const users = await userService.list();

    expect(users).to.deep.equal(stub);
  });

  it('get should return correct response', async () => {
    const stub = {
      id: 1,
      name: 'Ed'
    };

    sinon.stub(server.dataSources.users, 'getDS')
      .callsFake(() => stub);

    const user = await userService.get(1);

    expect(user).to.deep.equal(stub);
  });
});
