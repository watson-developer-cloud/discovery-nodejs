import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { LineChart } from 'recharts';
import AnomalyDetection from '../../AnomalyDetection/index';
import NoAnomaliesOverlay from '../../AnomalyDetection/NoAnomaliesOverlay';
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

  describe('when the anomalyData has no anomalies', () => {
    const propsWithNoAnomalies = Object.assign({}, props, {
      anomalyData: [
        {
          key_as_string: '2017-08-01T00:00:00.000-04:00',
          matching_results: 10,
        },
      ],
    });

    beforeEach(() => {
      wrapper = shallow(<AnomalyDetection {...propsWithNoAnomalies} />);
    });

    it('should add a "faded" className to the <LineChart />', () => {
      const actual = wrapper.find(LineChart).props();

      expect(actual.className).toEqual(expect.stringContaining('faded'));
    });

    it('show have a <NoAnomaliesOverlay />', () => {
      const actual = wrapper.find(NoAnomaliesOverlay);

      expect(actual).toHaveLength(1);
      expect(actual.props().text).toEqual('foo');
    });

    describe('and the handleViewData is clicked invoked', () => {
      beforeEach(() => {
        wrapper.instance().handleViewData();
      });

      it('removes the overlay', () => {
        const actual = wrapper.find(NoAnomaliesOverlay);

        expect(actual).toHaveLength(0);
      });
    });
  });

  describe('formatDate', () => {
    it('formats a date in MM/DD', () => {
      const actual = AnomalyDetection.formatDate(props.anomalyData[0].key_as_string);

      expect(actual).toEqual('08/01');
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
