const supertest = require('supertest');
const server = require('../server/server');
const { expect } = require('chai');
const expectedResponse = require('./data/user-list.json');

describe('GET /api/users', () => {
  it('should return the correct response if downstream system returns response', (done) => {
    supertest(server)
      .get('/api/users')
      .expect(200)
      .end((error, response) => {
        expect(error).to.equal(null);
        expect(response.body).to.deep.equal(expectedResponse);

        return done();
      });
  });
});
