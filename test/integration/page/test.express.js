const path = require('path');
// load default variables for testing
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

const request = require('supertest');
const app = require('../../../app');
const handleError = require('../../utils/handleError');

describe('express', () => {
  it('load home page when GET /', (done) => {
    handleError(done, () => {
      request(app)
        .get('/')
        .expect(200);
    });
  });

  it('404 when page not found', () => request(app)
    .get('/foo/bar')
    .expect(404));
});
