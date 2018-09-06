const api = require('../api');

module.exports = {
  list: (...args) => {
    const [
      userId
    ] = args;

    return api.dataSources.todos.listDS(userId);
  }
};
