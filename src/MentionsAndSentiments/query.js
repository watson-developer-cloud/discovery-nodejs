const { fields } = require('../fields');

const mentionsAgg = [
  `filter(${fields.title_entity_type}::Company)`,
  `term(${fields.title_entity_text})`,
  `timeslice(${fields.publication_date},1day)`,
  `term(${fields.text_document_sentiment_type})`,
].join('.');

module.exports = {
  aggregations: [mentionsAgg],
};
