import React from 'react';
import SentimentChart from './SentimentChart.jsx';
import SentimentBySource from './SentimentBySource.jsx';
import QuerySyntax from '../QuerySyntax/index.jsx';
import queryBuilder from '../../query-builder.js';  // eslint-disable-line


export default React.createClass({
  displayName: 'SentimentAnalysis',

  propTypes: {
    sentiment: React.PropTypes.object.isRequired,
    sentiments: React.PropTypes.object.isRequired,
    query: React.PropTypes.shape({
      text: React.PropTypes.string,
      date: React.PropTypes.object,
    }),
  },

  getInitialState() {
    return {
      showQuery: false,
    };
  },

  onShowQuery() {
    this.setState({ showQuery: true });
  },

  onShowResults() {
    this.setState({ showQuery: false });
  },

  filterEmptySentimentResults(sentiments) {
    return sentiments.results.filter((result) =>  {
      return result.aggregations[0].results.length > 0;
    });
  },

  render() {
    return (
      <div>
        {!this.state.showQuery ? (
          <div className="sentiment widget">
            <div className="widget--header">
              <h2 className="base--h2 widget--header-title">Sentiment Analysis</h2>
              <div className="widget--header-spacer" />
              <button
                className="base--button widget--header-button"
                href="#" onClick={this.onShowQuery}
              >
                View Query
              </button>
            </div>
            <p className="base--p sentiment--description">
              Extract sentiment from news articles across a variety of news sources (10 random sources used below).
            </p>
            <SentimentChart sentiment={this.props.sentiment} showLabels size="large" />
            <SentimentBySource sentiments={this.filterEmptySentimentResults(this.props.sentiments)} />
          </div>
        ) : (
          <QuerySyntax
            title="Sentiment Analysis"
            query={queryBuilder.build(this.props.query, true)}
            response={{ sentiment: this.props.sentiment, sentiments: this.props.sentiments }}
            onGoBack={this.onShowResults}
          />
        )
      }
      </div>
    );
  },
});
