import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import Accordion from '../../Accordion';
import NoContent from '../../NoContent';
import MentionsAndSentiments from '../../MentionsAndSentiments';

describe('<MentionsAndSentiments />', () => {
  const mentionsSample = {
    type: 'filter',
    match: 'enrichedTitle.entities.type::Company',
    matching_results: 10591,
    aggregations: [
      {
        type: 'term',
        field: 'enrichedTitle.entities.text',
        results: [
          {
            key: 'Company One',
            matching_results: 20,
            aggregations: [
              {
                type: 'timeslice',
                field: 'blekko.chrondate',
                interval: '1d',
                results: [
                  {
                    key_as_string: '1488412800',
                    key: 1488412800000,
                    matching_results: 20,
                    aggregations: [
                      {
                        type: 'term',
                        field: 'docSentiment.type',
                        results: [
                          {
                            key: 'positive',
                            matching_results: 5,
                          },
                          {
                            key: 'negative',
                            matching_results: 7,
                          },
                          {
                            key: 'neutral',
                            matching_results: 8,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            key: 'Company Two',
            matching_results: 10,
            aggregations: [
              {
                type: 'timeslice',
                field: 'blekko.chrondate',
                interval: '1d',
                results: [
                  {
                    key_as_string: '1488326400',
                    key: 1488326400000,
                    matching_results: 1,
                    aggregations: [
                      {
                        type: 'term',
                        field: 'docSentiment.type',
                        results: [
                          {
                            key: 'positive',
                            matching_results: 1,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    key_as_string: '1488412800',
                    key: 1488412800000,
                    matching_results: 9,
                    aggregations: [
                      {
                        type: 'term',
                        field: 'docSentiment.type',
                        results: [
                          {
                            key: 'positive',
                            matching_results: 2,
                          },
                          {
                            key: 'negative',
                            matching_results: 3,
                          },
                          {
                            key: 'neutral',
                            matching_results: 4,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            key: 'Company Three',
            matching_results: 10,
            aggregations: [
              {
                type: 'timeslice',
                field: 'blekko.chrondate',
                interval: '1d',
                results: [
                  {
                    key_as_string: '1488326400',
                    key: 1488326400000,
                    matching_results: 1,
                    aggregations: [
                      {
                        type: 'term',
                        field: 'docSentiment.type',
                        results: [
                          {
                            key: 'positive',
                            matching_results: 1,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    key_as_string: '1488412800',
                    key: 1488412800000,
                    matching_results: 9,
                    aggregations: [
                      {
                        type: 'term',
                        field: 'docSentiment.type',
                        results: [
                          {
                            key: 'positive',
                            matching_results: 2,
                          },
                          {
                            key: 'negative',
                            matching_results: 3,
                          },
                          {
                            key: 'neutral',
                            matching_results: 4,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    key_as_string: '1488412800',
                    key: 1488412800000,
                    matching_results: 18,
                    aggregations: [
                      {
                        type: 'term',
                        field: 'docSentiment.type',
                        results: [
                          {
                            key: 'positive',
                            matching_results: 5,
                          },
                          {
                            key: 'negative',
                            matching_results: 6,
                          },
                          {
                            key: 'neutral',
                            matching_results: 7,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const mentionsEmptySample = {
    type: 'filter',
    match: 'enrichedTitle.entities.type::Company',
    matching_results: '0',
    aggregations: [
      {
        type: 'term',
        field: 'enrichedTitle.entities.text',
        results: [],
      },
    ],
  };

  const querySample = {
    date: {
      from: '20170301',
      to: '20170501',
    },
    text: 'Sample Company',
  };

  it('Orders results by number of mentions', () => {
    const wrapper = shallow(
      <MentionsAndSentiments query={querySample} mentions={mentionsSample} />
    );
    const firstMention = wrapper.find(Accordion).getElements()[0].props.header.props.children[0]
      .props.children;
    const secondMention = wrapper.find(Accordion).getElements()[1].props.header.props.children[0]
      .props.children;
    const thirdMention = wrapper.find(Accordion).getElements()[2].props.header.props.children[0]
      .props.children;
    assert.equal(firstMention, 'Sample Company + Company Three');
    assert.equal(secondMention, 'Sample Company + Company One');
    assert.equal(thirdMention, 'Sample Company + Company Two');
  });

  it('Mentions should equal the sum of positive, negative, and neutral mentions', () => {
    const wrapper = shallow(
      <MentionsAndSentiments query={querySample} mentions={mentionsSample} />
    );
    const firstMentionCount = wrapper.find(Accordion).getElements()[0].props.header.props.children[1].props
      .children;
    const secondMentionCount = wrapper.find(Accordion).getElements()[1].props.header.props.children[1].props
      .children;
    const thirdMentionCount = wrapper.find(Accordion).getElements()[2].props.header.props.children[1].props
      .children;
    assert.equal(firstMentionCount, 28);
    assert.equal(secondMentionCount, 20);
    assert.equal(thirdMentionCount, 10);
  });

  it('Shows the No Content component when there are no results', () => {
    const wrapper = shallow(
      <MentionsAndSentiments query={querySample} mentions={mentionsEmptySample} />
    );
    assert.equal(wrapper.find(NoContent).length, 1);
  });
});
