import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import AnomalyDetection from '../../AnomalyDetection/index';
import QuerySyntax from '../../QuerySyntax/index';
import NoContent from '../../NoContent/index';

describe('<AnomalyDetection />', () => {
  let wrapper;

  const props = {
    anomalyData: [
      {
        key_as_string: '2017-08-01T00:00:00.000-04:00',
        matching_results: 10,
        anomaly: 0.5,
      },
    ],
    query: {
      text: 'foo',
    },
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AnomalyDetection {...props} />, div);
  });

  describe('formatDate', () => {
    it('formats a date in MM/DD', () => {
      const actual = AnomalyDetection.formatDate(props.anomalyData[0].key_as_string);

      expect(actual).toEqual('08/01');
    });
  });

  describe('when rendering charts', () => {
    beforeEach(() => {
      wrapper = shallow(<AnomalyDetection {...props} />);
    });

    describe('when dotProps does not have an anomaly', () => {
      const dotProps = {
        payload: {},
      };

      it('does not pass any color to the <Dot /> for renderDot', () => {
        const actual = wrapper.instance().renderDot(dotProps).props;

        expect(actual.fill).toBeUndefined();
        expect(actual.stroke).toBeUndefined();
      });

      it('does not pass any color to the <Dot /> for renderActiveDot', () => {
        const actual = wrapper.instance().renderActiveDot(dotProps).props;

        expect(actual.fill).toBeUndefined();
        expect(actual.stroke).toBeUndefined();
      });
    });

    describe('when dotProps has an anomaly', () => {
      const dotProps = {
        payload: {
          anomaly: 0.5,
        },
      };

      it('passes the anomaly color to <Dot /> for renderDot', () => {
        const actual = wrapper.instance().renderDot(dotProps).props;

        expect(actual.fill).toEqual(AnomalyDetection.defaultProps.colorAnomaly);
        expect(actual.stroke).toEqual(AnomalyDetection.defaultProps.colorAnomaly);
      });

      it('passes the active anomaly color to <Dot /> for renderActiveDot', () => {
        const actual = wrapper.instance().renderActiveDot(dotProps).props;

        expect(actual.fill).toEqual(AnomalyDetection.defaultProps.colorAnomalyActive);
        expect(actual.stroke).toEqual(AnomalyDetection.defaultProps.colorAnomalyActive);
      });
    });

    describe('when tooltipProps has an anomaly', () => {
      const tooltipProps = {
        payload: [
          {
            payload: {
              anomaly: 0.5,
            },
          },
        ],
      };

      it('passes expected props to <Tooltip />', () => {
        const actual = wrapper.instance().renderTooltip(tooltipProps).props;
        const expectedPayload = [
          {
            payload: {
              anomaly: 0.5,
            },
          },
          {
            dataKey: 'anomaly',
            name: 'Anomaly',
            color: AnomalyDetection.defaultProps.colorAnomalyActive,
            value: 0.5,
          },
        ];

        expect(actual.content).toBeNull();
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('when tooltipProps does not have an anomaly', () => {
      const tooltipProps = {
        payload: [
          {
            payload: {},
          },
        ],
      };

      it('does not pass anything to <Tooltip />', () => {
        const actual = wrapper.instance().renderTooltip(tooltipProps).props;

        expect(actual.content).toBeNull();
        expect(actual.payload).toEqual(tooltipProps.payload);
      });
    });
  });

  describe('when loading for the first time', () => {
    beforeEach(() => {
      wrapper = shallow(<AnomalyDetection {...props} />);
    });

    it('shows the chart', () => {
      expect(wrapper.find('.anomaly-detection')).toHaveLength(1);
      expect(wrapper.find(QuerySyntax)).toHaveLength(0);
    });

    describe('when onShowQuery is triggered', () => {
      beforeEach(() => {
        wrapper.instance().onShowQuery();
      });

      it('shows the <QuerySyntax /> with expected props', () => {
        const querySyntax = wrapper.find(QuerySyntax);
        expect(wrapper.find('.anomaly-detection')).toHaveLength(0);
        expect(querySyntax).toHaveLength(1);

        const querySyntaxProps = querySyntax.props();
        const expectedQuery = '"foo",language:(english|en)';

        expect(querySyntaxProps.query.query).toEqual(expectedQuery);
        expect(querySyntaxProps.title).toEqual(AnomalyDetection.widgetTitle());
        expect(querySyntaxProps.response).toEqual({ results: props.anomalyData });
      });
    });
  });

  describe('when there is no anomalyData', () => {
    const propsWithNoData = Object.assign({}, props, {
      anomalyData: [],
    });

    beforeEach(() => {
      wrapper = shallow(<AnomalyDetection {...propsWithNoData} />);
    });

    it('shows <NoContent />', () => {
      expect(wrapper.find(NoContent)).toHaveLength(1);
    });
  });
});
