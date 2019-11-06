import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import SentimentAnalysis from '../../SentimentAnalysis';
import SentimentBySource from '../../SentimentAnalysis/SentimentBySource';

describe('<SentimentAnalysis />', () => {
  describe('When SentimentAnalysis is loaded', () => {
    const partiallyEmptySources = {
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
              ],
            },
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

    const sentimentSample = {
      field: '',
      type: '',
      results: [],
    };

    const querySample = {
      date: {
        from: '20170301',
        to: '20170501',
      },
      text: 'Sample Company',
    };

    let filteredSentiments;

    beforeEach(() => {
      const wrapper = shallow(
        <SentimentAnalysis
          query={querySample}
          sentiments={partiallyEmptySources}
          sentiment={sentimentSample}
        />,
      );
      filteredSentiments = wrapper.find(SentimentBySource).props().sentiments;
    });

    it('filters out sources with no results', () => {
      assert.equal(filteredSentiments.length, 1);
    });
  });
});
