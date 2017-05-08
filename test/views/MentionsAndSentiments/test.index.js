import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import Accordion from '../../../views/Accordion/index.jsx';
import MentionsAndSentiments from '../../../views/MentionsAndSentiments/index.jsx';

describe('<MentionsAndSentiments />', () => {
  let mentions_sample = {
    'type': 'filter',
    'match': 'enrichedTitle.entities.type::Company',
    'matching_results': 10591,
    'aggregations': [
      {
        'type': 'term',
        'field': 'enrichedTitle.entities.text',
        'results': [
          {
            'key': 'Company One',
            'matching_results': 3591,
            'aggregations': [
              {
                'type': 'timeslice',
                'field': 'blekko.chrondate',
                'interval': '1d',
                'results': [
                  {
                    'key_as_string': '1488412800',
                    'key': 1488412800000,
                    'matching_results': 74,
                    'aggregations': [
                      {
                        'type': 'term',
                        'field':'docSentiment.type',
                        'results': [
                          {
                            'key':'positive',
                            'matching_results': 49
                          },
                          {
                            'key':'negative',
                            'matching_results': 21
                          },
                          {
                            'key':'neutral',
                            'matching_results': 4
                          }
                        ]
                      }
                    ]
                  },
                ]
              }
            ]
          },
          {
            'key': 'Company Two',
            'matching_results': 465,
            'aggregations': [
              {
                'type': 'timeslice',
                'field': 'blekko.chrondate',
                'interval': '1d',
                'results': [
                  {
                    'key_as_string': '1488326400',
                    'key': 1488326400000,
                    'matching_results': 4,
                    'aggregations': [
                      {
                        'type': 'term',
                        'field': 'docSentiment.type',
                        'results': [
                          {
                            'key': 'positive',
                            'matching_results': 4
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'key_as_string': '1488412800',
                    'key': 1488412800000,
                    'matching_results': 43,
                    'aggregations': [
                      {
                        'type': 'term',
                        'field': 'docSentiment.type',
                        'results': [
                          {
                            'key': 'positive',
                            'matching_results': 1000000
                          },
                          {
                            'key': 'negative',
                            'matching_results': 3
                          },
                          {
                            'key': 'neutral',
                            'matching_results': 1
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
        ]
      }
    ]
  };

  let query_sample = {
    date: {
      'from': '20170301',
      'to': '20170501'
    },
    'text': 'Sample Company'
  };

  it('Orders results by number of mentions', () => {
    let wrapper = shallow(<MentionsAndSentiments query={query_sample} mentions={mentions_sample} />);
    let firstMention = wrapper.find(Accordion).nodes[0].props.header.props.children[0].props.children;
    let secondMention = wrapper.find(Accordion).nodes[1].props.header.props.children[0].props.children;
    assert.equal(firstMention, 'Sample Company + Company Two');
    assert.equal(secondMention, 'Sample Company + Company One');
  });

  it('Mentions should equal the sum of positive, negative, and neutral mentions', () => {
    let wrapper = shallow(<MentionsAndSentiments query={query_sample} mentions={mentions_sample} />);
    let firstMentionCount = wrapper.find(Accordion).nodes[0].props.header.props.children[1].props.children;
    let secondMentionCount = wrapper.find(Accordion).nodes[1].props.header.props.children[1].props.children;
    assert.equal(firstMentionCount, 1000008);
    assert.equal(secondMentionCount, 74);
  });
});
