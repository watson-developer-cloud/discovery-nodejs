import React from 'react';
import { string, number, bool, shape } from 'prop-types';
import { Dot } from 'recharts';
import AnomalyDetection from './index';

function AnomalyDot({
  active,
  dotColor,
  dotStrokeWidth,
  activeDotStrokeWidth,
  ...props
}) {
  const hasAnomaly = AnomalyDetection.hasAnomaly(props.payload);

  if (hasAnomaly) {
    return (
      <g className="anomaly-dot">
        <Dot
          {...props}
          stroke={dotColor}
          fill={dotColor}
          r={6.5}
        />
        <Dot
          {...props}
          stroke={dotColor}
          strokeWidth={active ? activeDotStrokeWidth : dotStrokeWidth}
          fill="none"
          r={10.5}
        />
      </g>
    );
  }
  return <Dot {...props} />;
}

AnomalyDot.propTypes = {
  active: bool.isRequired,
  activeDotStrokeWidth: number.isRequired,
  dotColor: string.isRequired,
  dotStrokeWidth: number.isRequired,
  payload: shape({
    anomaly: number,
  }),
};

AnomalyDot.defaultProps = {
  active: false,
  activeDotStrokeWidth: 3,
  dotColor: '#e2237e',
  dotStrokeWidth: 1,
};

export default AnomalyDot;
