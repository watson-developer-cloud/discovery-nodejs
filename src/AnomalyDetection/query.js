const { fields } = require('../fields');

const timesliceParams = [
  `field:${fields.publication_date}`,
  'interval:1day',
  'time_zone:America/New_York',
  'anomaly:true',
].join(',');
const anomalyAgg = `timeslice(${timesliceParams}).top_hits(1)`;

module.exports = {
  aggregations: [ anomalyAgg ],
};
