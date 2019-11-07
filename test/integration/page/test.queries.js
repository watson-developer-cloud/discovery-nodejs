// load default variables for testing
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });
const request = require('supertest');
const moment = require('moment');
const app = require('../../../app');

if (!process.env.DISCOVERY_IAM_APIKEY) {
  // eslint-disable-next-line
  console.log('Skipping integration tests because DISCOVERY_IAM_APIKEY is null.');
} else {
  const API_ENDPOINT = '/api/query';

  describe('queries', function run() {
    this.timeout(20000);
    it('Should work with "IBM"', () => request(app)
      .post(API_ENDPOINT)
      .query({ text: 'IBM' })
    // eslint-disable-next-line comma-dangle
      .expect(200));

    it('Should work with "International Business Machines"', () => request(app)
      .post(API_ENDPOINT)
      .query({ text: 'International Business Machines' })
    // eslint-disable-next-line comma-dangle
      .expect(200));

    it('Should work with "General Motors"', () => request(app)
      .post(API_ENDPOINT)
      .query({ text: 'General Motors' })
    // eslint-disable-next-line comma-dangle
      .expect(200));

    it('Should work with a date range', () => request(app)
      .post(API_ENDPOINT)
      .query({
        text: 'IBM',
        date: {
          from: moment()
            .subtract(2, 'months')
            .format('YYYYMMDD'),
          to: moment().format('YYYYMMDD'),
        },
        restrictedDateRange: true,
      })
    // eslint-disable-next-line comma-dangle
      .expect(200));
  });
}
