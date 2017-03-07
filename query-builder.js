
// Aggregations used to build the different parts of the UI
const moment = require('moment');

const entities = [
  'nested(enrichedTitle.entities).filter(enrichedTitle.entities.type:Company).term(enrichedTitle.entities.text)',
  'nested(enrichedTitle.entities).filter(enrichedTitle.entities.type:Person).term(enrichedTitle.entities.text)',
  'term(enrichedTitle.concepts.text)',
];

const sentiments = [
  'term(blekko.basedomain).term(docSentiment.type)',
  'term(docSentiment.type)',
  'min(docSentiment.score)',
  'max(docSentiment.score)',
];

const mentions = [
  // eslint-disable-next-line
  'filter(enrichedTitle.entities.type::Company).term(enrichedTitle.entities.text).timeslice(blekko.chrondate,1day).term(docSentiment.type)'
];

module.exports = {
  aggregations: [].concat(entities, sentiments, mentions),
  entities,
  sentiments,
  mentions,
  build(query, full) {
    const params = {
      count: 5,
      return: 'title,enrichedTitle.text,url,host',
      query: `"${query.text}",language:english`,
    };
    if (full) {
      params.aggregations = [].concat(entities, sentiments, mentions);
    }
    if (query.date) {
      params.filter = `blekko.hostrank>20,blekko.chrondate>${moment(query.date.from).unix()},blekko.chrondate<${moment(query.date.to).unix()}`;
    }
    return params;
  },
};
