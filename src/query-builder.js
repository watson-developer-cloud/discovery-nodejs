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
  widgetQueries: {
    topStories: TopStoriesQuery,
    topEntities: TopEntitiesQuery,
    sentimentAnalysis: SentimentAnalysisQuery,
    mentionsAndSentiments: MentionsAndSentimentsQuery,
    anomalyDetection: AnomalyDetectionQuery,
  },
  build(query, widgetQuery) {
    const params = {
      query: `"${query.text}"`,
    };
    params.filter = `${fields.language}:(english|en)`;
    if (query.date) {
      params.filter = [
        params.filter,
        `${fields.publication_date}>${moment(query.date.from).format(ISO_8601)}`,
        `${fields.publication_date}<${moment(query.date.to).format(ISO_8601)}`,
      ].join(',');
    }
    if (widgetQuery) {
      return Object.assign({}, params, widgetQuery);
    }

    // do a full query
    const allWidgetAggregations = [].concat(
      TopEntitiesQuery.aggregations,
      SentimentAnalysisQuery.aggregations,
      MentionsAndSentimentsQuery.aggregations,
      // eslint-disable-next-line comma-dangle
      AnomalyDetectionQuery.aggregations
    );
    params.aggregation = `[${allWidgetAggregations.join(',')}]`;
    // add in TopStoriesQuery since it is the only one without aggregations
    return Object.assign({}, params, TopStoriesQuery);
  },
};
