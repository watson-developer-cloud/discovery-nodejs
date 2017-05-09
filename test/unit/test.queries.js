/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const path = require('path');
// load default variables for testing
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

if (!process.env.DISCOVERY_USERNAME || process.env.DISCOVERY_USERNAME === '<username>') {
  // eslint-disable-next-line
  console.log('Skipping integration tests because DISCOVERY_USERNAME is null.');
} else {
  const app = require('../../app');
  const request = require('supertest');
  const API_ENDPOINT = '/api/query';
  const moment = require('moment');

  describe('queries', function () {
    let testNewsApp;

    before((done) => {
      app.then((newsApp) => {
        testNewsApp = newsApp;
        done();
      });
    });

    this.timeout(20000);
    it('Should work with "IBM"', () =>
      request(testNewsApp)
      .post(API_ENDPOINT)
      .query({ text: 'IBM' })
      .expect(200)
    );

    it('Should work with "International Business Machines"', () =>
      request(testNewsApp)
      .post(API_ENDPOINT)
      .query({ text: 'International Business Machines' })
      .expect(200)
    );

    it('Should work with "General Motors"', () =>
      request(testNewsApp)
      .post(API_ENDPOINT)
      .query({ text: 'General Motors' })
      .expect(200)
    );

    it('Should work with a date range', () =>
      request(testNewsApp)
      .post(API_ENDPOINT)
      .query({
        text: 'IBM',
        date: {
          from: moment().subtract(2, 'months').format('YYYYMMDD'),
          to: moment().format('YYYYMMDD')
        },
        restrictedDateRange: true
      })
      .expect(200)
    );
  });
}
