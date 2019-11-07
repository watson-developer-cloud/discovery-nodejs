const DISCOVERY_ENVIRONMENT_ID = 'system';
const DISCOVERY_COLLECTION_ID = 'news';

const DiscoveryV1 = require('ibm-watson/discovery/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

// Create the service wrapper
const discovery = new DiscoveryV1({
  version: '2019-02-28',
  authenticator: new IamAuthenticator({
    apikey: process.env.DISCOVERY_IAM_APIKEY,
  }),
  url: process.env.DISCOVERY_URL,
});

// Bootstrap application settings
const express = require('express');
const path = require('path');
const queryBuilder = require('./src/query-builder');

const app = express();
require('./config/express')(app);

function getWidgetQuery(request) {
  const { widgetQueries } = request.query;

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

        return {
          ...finalWidgetQuery,
          ...queryBuilderWidgetQuery,
          aggregations: currentAggregations.concat(widgetAggregations),
        };
      }
    }
    return { ...finalWidgetQuery, ...queryBuilderWidgetQuery };
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

  const params = {
    ...queryParams,
    environmentId: DISCOVERY_ENVIRONMENT_ID,
    collectionId: DISCOVERY_COLLECTION_ID,
  };

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
