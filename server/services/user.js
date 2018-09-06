const api = require('../api');
const getCircuitBreaker = require('../helpers/get-circuit-breaker');

module.exports = {
  list: () => getCircuitBreaker('user-list')
    .execute(api.dataSources.users, 'listDS', [])
};
