const { fields } = require('../fields');

const timesliceParams = [
  `field:${fields.publication_date}`,
  'interval:1day',
  'time_zone:America/New_York',
  'anomaly:true',
].join(',');
const anomalyAgg = [
  `timeslice(${timesliceParams})`,
  `term(${fields.text_keyword_text},count:1)`,
  `term(${fields.title},count:1)`,
].join('.');
module.exports = {
  aggregations: [anomalyAgg],
};
