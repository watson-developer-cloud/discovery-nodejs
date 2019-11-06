import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Dot } from 'recharts';
import AnomalyDot from '../../AnomalyDetection/AnomalyDot';

describe('<AnomalyDot />', () => {
  let wrapper;

  const props = {
    active: false,
    payload: {
      anomaly: 0.5,
    },
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AnomalyDot {...props} />, div);
  });

  describe('when rendering a dot without an anomaly', () => {
    const propsWithoutAnomaly = { ...props, payload: {} };

    beforeEach(() => {
      wrapper = shallow(<AnomalyDot {...propsWithoutAnomaly} />);
    });

    it('should render exactly 1 <Dot />', () => {
      const actual = wrapper.find(Dot);
      const { active, ...dotProps } = propsWithoutAnomaly;

      expect(actual).toHaveLength(1);
      expect(actual.props()).toEqual(dotProps);
    });
  });

  describe('when rendering a dot with an anomaly', () => {
    describe('and it is not active', () => {
      beforeEach(() => {
        wrapper = shallow(<AnomalyDot {...props} />);
      });

      it('should render 2 <Dot /> with expected className and radius', () => {
        const actualDots = wrapper.find(Dot);
        const firstDotProps = actualDots.get(0).props;
        const secondDotProps = actualDots.get(1).props;

        expect(firstDotProps.className).toEqual('anomaly-dot-inside');
        expect(firstDotProps.r).toEqual(6.5);
        expect(secondDotProps.className).toEqual('anomaly-dot-outside');
        expect(secondDotProps.r).toEqual(10.5);
      });
    });

    describe('and it is active', () => {
      const propsWithActive = { ...props, active: true };

      beforeEach(() => {
        wrapper = shallow(<AnomalyDot {...propsWithActive} />);
      });

      it('should render 2 <Dot /> with expected className and radius', () => {
        const actualDots = wrapper.find(Dot);
        const firstDotProps = actualDots.get(0).props;
        const secondDotProps = actualDots.get(1).props;

        expect(firstDotProps.className).toEqual('anomaly-dot-inside');
        expect(firstDotProps.r).toEqual(6.5);
        expect(secondDotProps.className).toEqual('anomaly-dot-outside active');
        expect(secondDotProps.r).toEqual(10.5);
      });
    });
  });
});
