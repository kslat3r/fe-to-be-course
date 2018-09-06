const sinon = require('sinon');
const { expect } = require('chai');
const server = require('../server');
const todoService = require('./todo');

describe('services/todo.js', () => {
  it('list should return correct response', async () => {
    const stub = [{
      id: 1
    }];

    sinon.stub(server.dataSources.todos, 'listDS')
      .callsFake(() => stub);

    const todos = await todoService.list();

    expect(todos).to.deep.equal(stub);
  });
});
