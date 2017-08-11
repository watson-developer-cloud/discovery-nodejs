const { fields } = require('../fields');

const sentimentByHostAgg = [
  `term(${fields.host})`,
  `term(${fields.text_document_sentiment_type})`,
].join('.');
const overallSentimentAgg = `term(${fields.text_document_sentiment_type})`;

module.exports = {
  aggregations: [sentimentByHostAgg, overallSentimentAgg],
};
