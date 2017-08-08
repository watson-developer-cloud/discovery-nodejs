import React, { Component } from 'react';
import { string, number, shape, arrayOf } from 'prop-types';
import SentimentChart from './SentimentChart';
import SentimentBySource from './SentimentBySource';
import QuerySyntax from '../QuerySyntax/index';
import queryBuilder from '../query-builder';

export default class SentimentAnalysis extends Component {
  static propTypes = {
    sentiment: shape({
      results: arrayOf(shape({
        key: string.isRequired,
        matching_results: number.isRequired,
      })).isRequired,
    }).isRequired,
    sentiments: shape({
      results: arrayOf(shape({
        key: string.isRequired,
        aggregations: arrayOf(shape({
          results: arrayOf(shape({
            key: string.isRequired,
          })).isRequired,
        })).isRequired,
      })).isRequired,
    }).isRequired,
    query: shape({
      text: string.isRequired,
      date: shape({
        from: string.isRequired,
        to: string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  static filterEmptySentimentResults(sentiments) {
    return sentiments.results.filter(result => result.aggregations[0].results.length > 0);
  }

  state = {
    showQuery: false,
  }

  onShowQuery = () => {
    this.setState({ showQuery: true });
  }

  onShowResults = () => {
    this.setState({ showQuery: false });
  }

  render() {
    const { sentiment, sentiments, query } = this.props;

    return (
      <div>
        {
          !this.state.showQuery
            ? (
              <div className="sentiment widget">
                <div className="widget--header">
                  <h2 className="base--h2 widget--header-title">
                      Sentiment Analysis
                  </h2>
                  <div className="widget--header-spacer" />
                  <button
                    className="base--button widget--header-button"
                    onClick={this.onShowQuery}
                  >
                      View Query
                  </button>
                </div>
                <p className="base--p sentiment--description">
                    Extract sentiment from news articles across a variety of
                    news sources (10 random sources used below).
                </p>
                <SentimentChart
                  sentiment={sentiment}
                  showLabels
                  size="large"
                />
                <SentimentBySource
                  sentiments={
                    SentimentAnalysis.filterEmptySentimentResults(sentiments)
                  }
                />
              </div>
            )
            : (
              <QuerySyntax
                title="Sentiment Analysis"
                query={queryBuilder.build(query, true)}
                response={{ sentiment, sentiments }}
                onGoBack={this.onShowResults}
              />
            )
        }
      </div>
    );
  }
}
