const api = require('../api');

module.exports = {
  list: () => {
    return api.dataSources.users.listDS();
  },

  get: (...args) => {
    const [
      userId
    ] = args;

    return api.dataSources.users.getDS(userId);
  }
};
