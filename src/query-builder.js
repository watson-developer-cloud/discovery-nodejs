
const { fields } = require('./fields');
// Aggregations used to build the different parts of the UI
const moment = require('moment');
// ISO 8601 date format accepted by the service
const ISO_8601 = 'YYYY-MM-DDThh:mm:ssZZ';

const entities = [
  `nested(${fields.title_entity}).filter(${fields.title_entity_type}:Company).term(${fields.title_entity_text})`,
  `nested(${fields.title_entity}).filter(${fields.title_entity_type}:Person).term(${fields.title_entity_text})`,
  `term(${fields.title_concept_text})`,
];

const sentiments = [
  `term(${fields.host}).term(${fields.text_document_sentiment_type})`,
  `term(${fields.text_document_sentiment_type})`,
  `min(${fields.text_document_sentiment_score})`,
  `max(${fields.text_document_sentiment_score})`,
];

const mentions = [
  `filter(${fields.title_entity_type}::Company).term(${fields.title_entity_text}).timeslice(${fields.publication_date},1day).term(${fields.text_document_sentiment_type})`,
];

module.exports = {
  aggregations: [].concat(entities, sentiments, mentions),
  entities,
  sentiments,
  mentions,
  build(query, full) {
    const params = {
      count: 5,
      return: `${fields.title},${fields.url},${fields.host},${fields.publication_date}`,
      query: `"${query.text}",${fields.language}:(english|en)`,
    };
    if (full) {
      params.aggregations = [].concat(entities, sentiments, mentions);
    }
    if (query.date) {
      params.filter = `${fields.publication_date}>${moment(query.date.from).format(ISO_8601)},${fields.publication_date}<${moment(query.date.to).format(ISO_8601)}`;
    }
    if (query.sort) {
      params.sort = query.sort === 'date' ? `-${fields.publication_date},-_score` : '-_score';
    }
    return params;
  },
};
