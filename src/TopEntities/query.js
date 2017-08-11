const { fields } = require('../fields');

const companiesAgg = [
  `nested(${fields.title_entity})`,
  `filter(${fields.title_entity_type}:Company)`,
  `term(${fields.title_entity_text})`,
].join('.');
const peopleAgg = [
  `nested(${fields.title_entity})`,
  `filter(${fields.title_entity_type}:Person)`,
  `term(${fields.title_entity_text})`,
].join('.');
const conceptAgg = `term(${fields.title_concept_text})`;

module.exports = {
  aggregations: [companiesAgg, peopleAgg, conceptAgg],
};
