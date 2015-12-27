import { expect } from 'chai';
import request from 'supertest';
// import app from '~/api/server.js';

// describe('/mock endpoint', () => {
//   it('GET responds with 200', (done) => {
//     request(app)
//       .get('/api/mock')
//       .expect(200, function(){
//         app.close();
//         done();
//       });
//   });
// });

describe('Mock test', () => {
  it('should work', () => {
    expect(5).to.equal(1+4);
  });
});