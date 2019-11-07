import React from 'react';
import { string, shape, arrayOf } from 'prop-types';
import SentimentChart from './SentimentChart';

function SentimentBySource({ sentiments }) {
  return (
    <div className="sentiment--sources-section">
      <div className="sentiment--sources">
        <div className="sentiment--sources-table">
          {
            sentiments.map((source) => (
              <div key={source.key} className="sentiment--source">
                <div
                  className="sentiment--source-cell sentiment--source-name"
                >
                  { source.key }
                </div>
                <div
                  className="sentiment--source-cell sentiment--source-summary"
                >
                  { source.aggregations[0].results[0].key }
                </div>
                <div
                  className="sentiment--source-cell sentiment--source-chart"
                >
                  <SentimentChart sentiment={source.aggregations[0]} />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

SentimentBySource.propTypes = {
  sentiments: arrayOf(shape({
    key: string.isRequired,
    aggregations: arrayOf(shape({
      results: arrayOf(shape({
        key: string.isRequired,
      })).isRequired,
    })).isRequired,
  })).isRequired,
};

export default SentimentBySource;
