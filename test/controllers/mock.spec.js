import { expect } from 'chai';
import request from 'supertest';
import app from '~/src/api/server.js';

describe('/mock endpoint', () => {
  it('GET responds with 200', (done) => {
    request(app)
      .get('/api/mock')
      .expect(200, done);
  });
});

describe('Mock test', () => {
  it('should work', () => {
    expect(5).to.equal(4+1);
  });
});