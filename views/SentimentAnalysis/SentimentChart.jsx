import React from 'react';

const SentimentChart = React.createClass({
  propTypes: {
    sentiment: React.PropTypes.shape({
      field: React.PropTypes.string.isRequired,
      type: React.PropTypes.string.isRequired,
      results: React.PropTypes.arrayOf(React.PropTypes.shape({
        key: React.PropTypes.string.isRequired,
        matching_results: React.PropTypes.number.isRequired,
      })).isRequired,
    }).isRequired,
    showLabels: React.PropTypes.bool,
    size: React.PropTypes.oneOf(['small', 'large']),
  },

  getDefaultProps() {
    return {
      showLabels: false,
      size: 'small',
    };
  },

  render() {
    const sum = this.props.sentiment.results.reduce((k, v) => k + v.matching_results, 0);
    const percentages = this.props.sentiment.results.reduce((k, v) => {
      // eslint-disable-next-line
      k[v.key] = 100 * (v.matching_results / sum);
      return k;
    }, { negative: 0, neutral: 0, positive: 0 });

    return (
      <div className="sentiment--chart-container">
        <div className={`sentiment--chart sentiment--chart_${this.props.size}`} >
          {['negative', 'neutral', 'positive'].filter((key) => Math.round(percentages[key]) > 0).map((key) =>
            <div key={key} className={`sentiment--bar sentiment--bar_${key}`} style={{ width: `${percentages[key]}%` }} />
          )}
        </div>
        {this.props.showLabels ? (
          <div className="sentiment--labels">
            <div className="sentiment--info sentiment--info_negative">
              <div className="sentiment--score">{`${Math.round(percentages.negative)}%`}</div>
              <div className="sentiment--label">Negative Sentiment</div>
            </div>
            {/* To make sure positive and negative are spread apart */}
            <div className="sentiment--info sentiment--spacer" />
            <div className="sentiment--info sentiment--info_positive">
              <div className="sentiment--score">{`${Math.round(percentages.positive)}%`}</div>
              <div className="sentiment--label">Positive Sentiment</div>
            </div>
          </div>
        ) : null}
      </div>
    );
  },
});

export default SentimentChart;
