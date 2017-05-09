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

const express = require('express');
const app = express();

const queryBuilder = require('./query-builder');

const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
const discovery = new DiscoveryV1({
  // If unspecified here, the DISCOVERY_USERNAME and
  // DISCOVERY_PASSWORD env properties will be checked
  // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
  // username: '<username>',
  // password: '<password>',
  version_date: '2016-11-09',
  qs: { aggregation: `[${queryBuilder.aggregations.join(',')}]` },
});

// Bootstrap application settings
require('./config/express')(app);

app.get('/', (req, res) => {
  res.render('index', {
    BLUEMIX_ANALYTICS: process.env.BLUEMIX_ANALYTICS,
  });
});

// gather news collection info
discovery.getEnvironments({}, (error, response) => {
  if (error) {
    console.error(error);
  } else {
    const news_environment_id = response.environments.find((environment) => {
      return environment.read_only == true;
    }).environment_id;

    discovery.getCollections({
      environment_id: news_environment_id
    }, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        const news_collection_id = response.collections[0].collection_id;

        // setup query endpoint for news
        app.post('/api/query', (req, res, next) => {
          const params = Object.assign({}, queryBuilder.build(req.body), {
            environment_id: news_environment_id,
            collection_id: news_collection_id
          });

          discovery.query(params, (error, response) => {
            if (error) {
              next(error);
            } else {
              res.json(response);
            }
          });
        });

        // error-handler settings for all other routes
        require('./config/error-handler')(app);
      }
    });
  }
});

module.exports = app;
