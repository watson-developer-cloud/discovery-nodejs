const moment = require('moment');
const { fields } = require('./fields');
const TopStoriesQuery = require('./TopStories/query');
const TopEntitiesQuery = require('./TopEntities/query');
const SentimentAnalysisQuery = require('./SentimentAnalysis/query');
const MentionsAndSentimentsQuery = require('./MentionsAndSentiments/query');
const AnomalyDetectionQuery = require('./AnomalyDetection/query');

// ISO 8601 date format accepted by the service
const ISO_8601 = 'YYYY-MM-DDThh:mm:ssZZ';

module.exports = {
  build(query, widgetQuery) {
    const params = {
      query: `"${query.text}",${fields.language}:(english|en)`,
    };
    if (query.date) {
      params.filter = `${fields.publication_date}>${moment(query.date.from).format(ISO_8601)},${fields.publication_date}<${moment(query.date.to).format(ISO_8601)}`;
    }
    if (query.sort) {
      params.sort = query.sort === 'date' ? `-${fields.publication_date},-_score` : '-_score';
    }
    if (widgetQuery) {
      const widgetQueryCopy = Object.assign({}, widgetQuery);

      if (widgetQueryCopy.aggregations) {
        params.aggregation = `[${widgetQueryCopy.aggregations.join(',')}]`;
      }
      return Object.assign({}, params, widgetQueryCopy);
    } else {
      const allWidgetAggregations = [].concat(
        TopEntitiesQuery.aggregations,
        SentimentAnalysisQuery.aggregations,
        MentionsAndSentimentsQuery.aggregations,
        AnomalyDetectionQuery.aggregations,
      );
      params.aggregation = `[${allWidgetAggregations.join(',')}]`;
      // add in TopStoriesQuery since it is the only one without aggregations
      return Object.assign({}, params, TopStoriesQuery);
    }
  },
};
