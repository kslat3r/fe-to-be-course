const { expect } = require('chai');
const getCircuitBreaker = require('./get-circuit-breaker');

describe('helpers/get-circuit-breaker.js', () => {
  it('return a circuit breaker service', async () => {
    const service = getCircuitBreaker('foo');

    expect(service.commandKey).to.equal('foo');
  });
});
