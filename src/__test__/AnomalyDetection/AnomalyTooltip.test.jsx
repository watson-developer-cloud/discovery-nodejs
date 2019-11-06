import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import AnomalyDetection from '../../AnomalyDetection/index';
import AnomalyTooltip from '../../AnomalyDetection/AnomalyTooltip';

describe('<AnomalyTooltip />', () => {
  let wrapper;

  const props = {
    label: '2017-01-01',
    labelFormatter: AnomalyDetection.formatDate,
    payload: [
      {
        payload: {
          matching_results: 100,
          anomaly: 0.5,
          aggregations: [
            {
              type: 'term',
              field: 'enriched_text.keywords.text',
              count: 1,
              results: [
                {
                  key: 'total solar eclipse',
                  matching_results: 1107,
                  aggregations: [
                    {
                      type: 'term',
                      field: 'title',
                      count: 1,
                      results: [
                        {
                          key: 'Article Title',
                          matching_results: 87,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  };

  it('renders with no props without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AnomalyTooltip />, div);
  });

  it('renders with props without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AnomalyTooltip {...props} />, div);
  });

  describe('when rendering a tooltip without an anomaly', () => {
    const propsWithoutAnomaly = {
      ...props,
      payload: [
        {
          payload: {
            matching_results: 100,
          },
        },
      ],
    };

    beforeEach(() => {
      wrapper = shallow(<AnomalyTooltip {...propsWithoutAnomaly} />);
    });

    it('should render a formatted label', () => {
      const actual = wrapper.find('.recharts-tooltip-label');

      expect(actual.text()).toEqual('01/01');
    });

    it('does not have a title', () => {
      expect(wrapper.find('.anomaly-tooltip-title--p')).toHaveLength(0);
    });

    it('should render the expected article count', () => {
      const actual = wrapper.find('.anomaly-tooltip-data--p');

      expect(actual.text()).toEqual('100 Articles');
    });

    describe('and there are no matching results', () => {
      const propsWithoutResults = {
        ...props,
        payload: [
          {
            payload: {},
          },
        ],
      };

      beforeEach(() => {
        wrapper = shallow(<AnomalyTooltip {...propsWithoutResults} />);
      });

      it('should render a 0 article count', () => {
        const actual = wrapper.find('.anomaly-tooltip-data--p');

        expect(actual.text()).toEqual('0 Articles');
      });
    });

    describe('and there is 1 matching result', () => {
      const propsWithOneResult = {
        ...props,
        payload: [
          {
            payload: {
              matching_results: 1,
            },
          },
        ],
      };

      beforeEach(() => {
        wrapper = shallow(<AnomalyTooltip {...propsWithOneResult} />);
      });

      it('should render a 1 article count', () => {
        const actual = wrapper.find('.anomaly-tooltip-data--p');

        expect(actual.text()).toEqual('1 Article');
      });
    });
  });

  describe('when rendering a tooltip with an anomaly', () => {
    beforeEach(() => {
      wrapper = shallow(<AnomalyTooltip {...props} />);
    });

    it('should show the article title', () => {
      const actual = wrapper.find('.anomaly-tooltip-title--p');

      expect(actual.text()).toEqual('Article Title');
    });

    it('should have an extra className on the tooltip articles span', () => {
      const actual = wrapper.find('.anomaly-tooltip-articles--span');

      expect(actual.props().className).toEqual('anomaly-tooltip-articles--span anomaly');
    });

    it('should render the expected article count with (Anomalous)', () => {
      const actual = wrapper.find('.anomaly-tooltip-data--p');

      expect(actual.text()).toEqual('100 Articles (Anomalous)');
    });
  });

  describe('when rendering a tooltip with a long title', () => {
    const longTitle = Array(122).join('a');
    const propsWithLongTitle = {
      ...props,
      payload: [
        {
          payload: {
            aggregations: [
              {
                type: 'term',
                field: 'enriched_text.keywords.text',
                count: 1,
                results: [
                  {
                    key: 'total solar eclipse',
                    matching_results: 1107,
                    aggregations: [
                      {
                        type: 'term',
                        field: 'title',
                        count: 1,
                        results: [
                          {
                            key: longTitle,
                            matching_results: 87,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      ],
    };

    beforeEach(() => {
      wrapper = shallow(<AnomalyTooltip {...propsWithLongTitle} />);
    });

    it('shows a truncated title', () => {
      const actual = wrapper.find('.anomaly-tooltip-title--p');
      const expected = `${Array(121).join('a')}…`;

      expect(actual.text()).toEqual(expected);
    });
  });
});
