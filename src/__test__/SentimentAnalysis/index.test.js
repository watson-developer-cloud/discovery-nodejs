import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import SentimentAnalysis from '../../SentimentAnalysis';
import SentimentBySource from '../../SentimentAnalysis/SentimentBySource';

describe('<SentimentAnalysis />', () => {
  describe('When SentimentAnalysis is loaded', () => {
    const partially_empty_sources = {
      type: 'term',
      field: 'blekko.basedomain',
      results: [
        {
          key: 'feedblitz.com',
          matching_results: 58,
          aggregations: [
            {
              type: 'term',
              field: 'docSentiment.type',
              results: [
                {
                  key: 'positive',
                  matching_results: 56,
                },
              ] },
          ],
        },
        {
          key: 'aolcdn.com',
          matching_results: 1,
          aggregations: [
            {
              type: 'term',
              field: 'docSentiment.type',
              results: [

              ],
            }],
        },
      ],
    };

    const sentiment_sample = {
      field: '',
      type: '',
      results: [],
    };

    let filtered_sentiments;

    beforeEach(() => {
      const wrapper = shallow(<SentimentAnalysis sentiments={partially_empty_sources} sentiment={sentiment_sample} />);
      filtered_sentiments = wrapper.find(SentimentBySource).props().sentiments;
    });

    it('filters out sources with no results', () => {
      assert.equal(filtered_sentiments.length, 1);
    });
  });
});
