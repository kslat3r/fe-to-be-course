const supertest = require('supertest');
const server = require('../server/server');
const { expect } = require('chai');
const expectedResponse = require('./data/user-get.json');

describe('GET /api/users/:userId', () => {
  it('should return the correct response if downstream system returns response', (done) => {
    supertest(server)
      .get('/api/users/1')
      .expect(200)
      .end((error, response) => {
        expect(error).to.equal(null);
        expect(response.body).to.deep.equal(expectedResponse);

        return done();
      });
  });
});
