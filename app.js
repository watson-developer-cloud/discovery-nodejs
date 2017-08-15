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

const queryBuilder = require('./src/query-builder');

const NEWS_ENVIRONMENT_ID = 'system';
const NEWS_COLLECTION_ID = 'news';

const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

const discovery = new DiscoveryV1({
  // If unspecified here, the DISCOVERY_USERNAME and
  // DISCOVERY_PASSWORD env properties will be checked
  // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
  // username: '<username>',
  // password: '<password>',
  version_date: '2017-08-01',
});

// Bootstrap application settings
const express = require('express');
const path = require('path');

const app = express();
require('./config/express')(app);

function getWidgetQuery(request) {
  const widgetQueries = request.query.widgetQueries;

  if (!widgetQueries) {
    return null;
  }

  return widgetQueries.split(',').reduce((widgetQuery, finalWidgetQuery) => {
    const queryBuilderWidgetQuery = queryBuilder.widgetQueries[widgetQuery];

    if (queryBuilderWidgetQuery) {
      const widgetAggregations = queryBuilderWidgetQuery.aggregations;

      if (widgetAggregations) {
        const currentAggregations = finalWidgetQuery.aggregations || [];
        delete queryBuilderWidgetQuery.aggregations;

        return Object.assign({}, finalWidgetQuery, queryBuilderWidgetQuery, {
          aggregations: currentAggregations.concat(widgetAggregations),
        });
      }
    }
    return Object.assign({}, finalWidgetQuery, queryBuilderWidgetQuery);
  }, {});
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// setup query endpoint for news
app.post('/api/query', (req, res, next) => {
  const queryParams = queryBuilder.build(req.body, getWidgetQuery(req));

  if (queryParams.aggregations) {
    queryParams.aggregation = `[${queryParams.aggregations.join(',')}]`;
    delete queryParams.aggregations;
  }

  const params = Object.assign({}, queryParams, {
    environment_id: NEWS_ENVIRONMENT_ID,
    collection_id: NEWS_COLLECTION_ID,
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

module.exports = app;
