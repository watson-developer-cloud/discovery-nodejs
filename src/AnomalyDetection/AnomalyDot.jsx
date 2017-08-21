import React from 'react';
import classNames from 'classnames';
import { number, bool, shape } from 'prop-types';
import { Dot } from 'recharts';
import AnomalyDetection from './index';
import './style.css';

function AnomalyDot({ active, ...props }) {
  const hasAnomaly = AnomalyDetection.hasAnomaly(props.payload);

  if (hasAnomaly) {
    return (
      <g className="anomaly-dot">
        <Dot
          className="anomaly-dot-inside"
          {...props}
          r={6.5}
        />
        <Dot
          className={classNames('anomaly-dot-outside', { active })}
          {...props}
          r={10.5}
        />
      </g>
    );
  }
  return <Dot {...props} />;
}

AnomalyDot.propTypes = {
  active: bool.isRequired,
  payload: shape({
    anomaly: number,
  }),
};

AnomalyDot.defaultProps = {
  active: false,
  payload: null,
};

export default AnomalyDot;
