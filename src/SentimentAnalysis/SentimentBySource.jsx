import React from 'react';
import { object, arrayOf } from 'prop-types';
import SentimentBar from './SentimentChart.jsx';

SentimentBySource.propTypes = {
  sentiments: arrayOf(object).isRequired
}

export default function SentimentBySource({ sentiments }) {
  return (
    <div className="sentiment--sources-section">
      <div className="sentiment--sources">
        <div className="sentiment--sources-table">
          {
            sentiments.map((source) =>
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
                  <SentimentBar sentiment={ source.aggregations[0] } />
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
