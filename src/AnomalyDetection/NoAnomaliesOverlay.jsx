import React from 'react';
import { string, func } from 'prop-types';
import './style.css';

function NoAnomaliesOverlay({ text, onViewData }) {
  return (
    <div className="anomaly-overlay--div">
      <p
        className="anomaly-overlay-title--p"
      >
        {`There are no anomalies in "${text}" for this date range`}
      </p>
      <p
        className="anomaly-overlay-subtitle--p"
      >
        Try changing the date range or searching for a different company
      </p>
      <div className="anomaly-overlay-button-container--div">
        <button type="button" onClick={onViewData}>
          View Data
        </button>
      </div>
    </div>
  );
}

NoAnomaliesOverlay.propTypes = {
  text: string.isRequired,
  onViewData: func.isRequired,
};

export default NoAnomaliesOverlay;
