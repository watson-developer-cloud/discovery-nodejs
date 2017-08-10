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
    const propsWithoutAnomaly = Object.assign({}, props, {
      payload: {},
    });

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

      it('should render 2 <Dot /> with expected props', () => {
        const actualDots = wrapper.find(Dot);
        const firstDotProps = actualDots.get(0).props;
        const secondDotProps = actualDots.get(1).props;
        const { dotColor, dotStrokeWidth } = AnomalyDot.defaultProps;

        expect(firstDotProps.fill).toEqual(dotColor);
        expect(firstDotProps.stroke).toEqual(dotColor);
        expect(secondDotProps.fill).toEqual('none');
        expect(secondDotProps.stroke).toEqual(dotColor);
        expect(secondDotProps.strokeWidth).toEqual(dotStrokeWidth);
      });
    });

    describe('and it is active', () => {
      const propsWithActive = Object.assign({}, props, {
        active: true,
      });

      beforeEach(() => {
        wrapper = shallow(<AnomalyDot {...propsWithActive} />);
      });

      it('should render 2 <Dot /> with expected props', () => {
        const actualDots = wrapper.find(Dot);
        const firstDotProps = actualDots.get(0).props;
        const secondDotProps = actualDots.get(1).props;
        const { dotColor, activeDotStrokeWidth } = AnomalyDot.defaultProps;

        expect(firstDotProps.fill).toEqual(dotColor);
        expect(firstDotProps.stroke).toEqual(dotColor);
        expect(secondDotProps.fill).toEqual('none');
        expect(secondDotProps.stroke).toEqual(dotColor);
        expect(secondDotProps.strokeWidth).toEqual(activeDotStrokeWidth);
      });
    });
  });
});
