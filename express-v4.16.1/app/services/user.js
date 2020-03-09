const request = require('request-promise');
const getCircuitBreaker = require('../helpers/get-circuit-breaker');
const { USERS_API_URI } = process.env;

module.exports = {
  list: () => getCircuitBreaker('user-list')
    .execute(request, 'get', [USERS_API_URI])
};
