import React from 'react';
import {
  string, number, bool, shape, arrayOf, oneOf,
} from 'prop-types';

function SentimentChart({ sentiment, size, showLabels }) {
  const sum = sentiment.results.reduce((k, v) => k + v.matching_results, 0);
  const percentages = sentiment.results.reduce((k, v) => ({ ...k, [v.key]: 100 * (v.matching_results / sum) }),
    { negative: 0, neutral: 0, positive: 0 });

  return (
    <div className="sentiment--chart-container">
      <div className={`sentiment--chart sentiment--chart_${size}`}>
        {
          ['negative', 'neutral', 'positive'].filter((key) => Math.round(percentages[key]) > 0).map((key) => (
            <div
              key={key}
              className={`sentiment--bar sentiment--bar_${key}`}
              style={{ width: `${percentages[key]}%` }}
            />
          ))
        }
      </div>
      {
        showLabels
          ? (
            <div className="sentiment--labels">
              <div className="sentiment--info sentiment--info_negative">
                <div className="sentiment--score">
                  {`${Math.round(percentages.negative)}%`}
                </div>
                <div className="sentiment--label">Negative Sentiment</div>
              </div>
              {/* To make sure positive and negative are spread apart */}
              <div className="sentiment--info sentiment--spacer" />
              <div className="sentiment--info sentiment--info_positive">
                <div className="sentiment--score">
                  {`${Math.round(percentages.positive)}%`}
                </div>
                <div className="sentiment--label">Positive Sentiment</div>
              </div>
            </div>
          )
          : null
      }
    </div>
  );
}

SentimentChart.propTypes = {
  sentiment: shape({
    results: arrayOf(shape({
      key: string.isRequired,
      matching_results: number.isRequired,
    })).isRequired,
  }).isRequired,
  showLabels: bool,
  size: oneOf(['small', 'large']),
};

SentimentChart.defaultProps = {
  size: 'small',
  showLabels: false,
};

export default SentimentChart;
