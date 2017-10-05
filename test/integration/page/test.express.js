const path = require('path');
// load default variables for testing
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

const app = require('../../../app');
const request = require('supertest');
const handleError = require('../../utils/handleError');

describe('express', () => {
  it('load home page when GET /', (done) => {
    handleError(done, () => {
      request(app).get('/').expect(200);
    });
  });

  it('404 when page not found', () =>
    // eslint-disable-next-line comma-dangle
    request(app).get('/foo/bar').expect(404)
  );
});
