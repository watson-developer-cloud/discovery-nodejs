import React from 'react';
import SentimentBar from './SentimentChart.jsx';

const SentimentBySource = (props) =>
  <div className="sentiment--sources-section">
    <div className="sentiment--sources">
      <div className="sentiment--sources-table">
        {props.sentiments.map((source) =>
          <div key={source.key} className="sentiment--source">
            <div className="sentiment--source-cell sentiment--source-name">{source.key}</div>
            <div className="sentiment--source-cell sentiment--source-summary">{source.aggregations[0].results[0].key}</div>
            <div className="sentiment--source-cell sentiment--source-chart">
              <SentimentBar sentiment={source.aggregations[0]} />
            </div>
          </div>
        )}
      </div>
    </div>
  </div>;

SentimentBySource.propTypes = {
  sentiments: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default SentimentBySource;
