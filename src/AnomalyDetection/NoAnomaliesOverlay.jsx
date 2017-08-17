import React from 'react';
import { string, func } from 'prop-types';
import './style.css';

function NoAnomaliesOverlay({ text, onViewData }) {
  return (
    <div className="anomaly-overlay--div">
      <h3>
        {`There are no anomalies in "${text}" for this date range`}
      </h3>
      <h4>
        Try searching for a different company with a recent leadership change or acquisition
      </h4>
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
