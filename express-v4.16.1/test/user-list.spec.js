const supertest = require('supertest');
const server = require('../app');
const { expect } = require('chai');
const expectedResponse = require('./data/user-list.json');

describe('GET /api/users', () => {
  it('should return the correct response if downstream system returns response', (done) => {
    supertest(server)
      .get('/api/users')
      .expect(200)
      .end((error, response) => {
        console.log(response.body);
        expect(error).to.equal(null);

        // expect(parseInt(response.headers.uptime, 10) > 0).to.equal(true);
        expect(response.body).to.deep.equal(expectedResponse);

        return done();
      });
  });
});
