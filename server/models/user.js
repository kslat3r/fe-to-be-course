const userService = require('../services/user');
const todoService = require('../services/todo');
const todoFilter = require('../filters/todo');
const todoMapper = require('../mappers/todo');

module.exports = (User) => {
  User.list = async () => {
    const userServiceRequest = userService.list();
    const todoServiceRequest = todoService.list();

    let resp;

    try {
      resp = await Promise.all([userServiceRequest, todoServiceRequest]);
    } catch (err) {
      throw err;
    }

    const [
      users,
      todos
    ] = resp;

    const mapped = todoMapper(users, todoFilter(todos));

    return mapped;
  };

  User.get = async (...args) => {
    const [
      userId
    ] = args;

    const userServiceRequest = userService.get(userId);
    const todoServiceRequest = todoService.list(userId);

    let resp;

    try {
      resp = await Promise.all([userServiceRequest, todoServiceRequest]);
    } catch (err) {
      throw err;
    }

    const [
      user,
      todos
    ] = resp;

    user.todos = todoFilter(todos);

    return user;
  };
};
