const sinon = require('sinon');
const userModel = require('./user');
const userService = require('../services/user');
const todoService = require('../services/todo');
const { expect } = require('chai');

describe('models/user.js', () => {
  let model;

  beforeEach(() => {
    model = {};

    userModel(model);
  });

  it('should bind the correct methods', () => {
    expect(typeof model.list).to.equal('function');
    expect(typeof model.get).to.equal('function');
  });

  it('list should return the correct response', async () => {
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

    const todos = [
      {
        userId: 1,
        text: 'Write my mocks',
        completed: false
      },
      {
        userId: 2,
        text: 'Write my comments',
        completed: false
      }
    ];

    sinon.stub(todoService, 'list')
      .callsFake(() => todos);

    const output = await model.list();

    expect(output).to.deep.equal([
      {
        id: 1,
        name: 'Ed',
        todos: [
          {
            userId: 1,
            text: 'Write my mocks',
            completed: false
          }
        ]
      },
      {
        id: 2,
        name: 'Lokesh',
        todos: [
          {
            userId: 2,
            text: 'Write my comments',
            completed: false
          }
        ]
      }
    ]);

    userService.list.restore();
    todoService.list.restore();
  });

  it('list should throw an error if user service throws an error', async () => {
    const errorMessage = 'An error occurred';
    const error = new Error(errorMessage);

    sinon.stub(userService, 'list')
      .callsFake(() => Promise.reject(error));

    sinon.stub(todoService, 'list')
      .callsFake(() => Promise.resolve([]));

    try {
      await model.list();
    } catch (e) {
      expect(e.message).to.equal(errorMessage);
    }

    userService.list.restore();
    todoService.list.restore();
  });

  it('list should throw an error if todo service throws an error', async () => {
    const errorMessage = 'An error occurred';
    const error = new Error(errorMessage);

    sinon.stub(userService, 'list')
      .callsFake(() => Promise.resolve([]));

    sinon.stub(todoService, 'list')
      .callsFake(() => Promise.reject(error));

    try {
      await model.list();
    } catch (e) {
      expect(e.message).to.equal(errorMessage);
    }

    userService.list.restore();
    todoService.list.restore();
  });

  it('get should return the correct response', async () => {
    const user = {
      id: 1,
      name: 'Ed'
    };

    sinon.stub(userService, 'get')
      .callsFake(() => Promise.resolve(user));

    const todos = [
      {
        userId: 1,
        text: 'Write my mocks',
        completed: false
      },
      {
        userId: 1,
        text: 'Write my comments',
        completed: false
      }
    ];

    sinon.stub(todoService, 'list')
      .callsFake(() => Promise.resolve(todos));

    const output = await model.get(1);

    expect(output).to.deep.equal({
      id: 1,
      name: 'Ed',
      todos: [
        {
          userId: 1,
          text: 'Write my mocks',
          completed: false
        },
        {
          userId: 1,
          text: 'Write my comments',
          completed: false
        }
      ]
    });

    userService.get.restore();
    todoService.list.restore();
  });

  it('get should throw an error if the user service throws an error', async () => {
    const errorMessage = 'An error occurred';
    const error = new Error(errorMessage);

    sinon.stub(userService, 'get')
      .callsFake(() => Promise.reject(error));

    sinon.stub(todoService, 'list')
      .callsFake(() => Promise.resolve([]));

    try {
      await model.get(1);
    } catch (e) {
      expect(e.message).to.equal(errorMessage);
    }

    userService.get.restore();
    todoService.list.restore();
  });

  it('get should throw an error if the todo service throws an error', async () => {
    const errorMessage = 'An error occurred';
    const error = new Error(errorMessage);

    sinon.stub(userService, 'get')
      .callsFake(() => Promise.resolve({}));

    sinon.stub(todoService, 'list')
      .callsFake(() => Promise.reject(error));

    try {
      await model.get(1);
    } catch (e) {
      expect(e.message).to.equal(errorMessage);
    }

    userService.get.restore();
    todoService.list.restore();
  });
});
