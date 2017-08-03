import React from 'react';
import { string, number, bool, shape, arrayOf, oneOf } from 'prop-types';

SentimentChart.propTypes = {
  sentiment: shape({
    field: string.isRequired,
    type: string.isRequired,
    results: arrayOf(shape({
      key: string.isRequired,
      matching_results: number.isRequired,
    })).isRequired,
  }).isRequired,
  showLabels: bool,
  size: oneOf(['small', 'large'])
}

export default function SentimentChart({ sentiment, size = 'small', showLabels = false }) {
  const sum = sentiment.results.reduce((k, v) => k + v.matching_results, 0);
  const percentages = sentiment.results.reduce((k, v) => {
    k[v.key] = 100 * (v.matching_results / sum);
    return k;
  }, { negative: 0, neutral: 0, positive: 0 });

  return (
    <div className="sentiment--chart-container">
      <div className={`sentiment--chart sentiment--chart_${size}`} >
        {
          ['negative', 'neutral', 'positive'].filter((key) => {
            return Math.round(percentages[key]) > 0;
          }).map((key) => {
            return (
              <div
                key={key}
                className={`sentiment--bar sentiment--bar_${key}`}
                style={{ width: `${percentages[key]}%` }}
              />
            );
          })
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
