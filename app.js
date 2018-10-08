const queryBuilder = require('./src/query-builder');

const NEWS_ENVIRONMENT_ID = 'system';
const NEWS_COLLECTION_ID = 'news';

const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

const discovery = new DiscoveryV1({
  version: '2017-08-01',
  url: process.env.DISCOVERY_URL || 'https://gateway.watsonplatform.net/discovery/api',
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
