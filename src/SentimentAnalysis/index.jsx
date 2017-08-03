import React, { Component } from 'react';
import { object, string, shape } from 'prop-types';
import SentimentChart from './SentimentChart.jsx';
import SentimentBySource from './SentimentBySource.jsx';
import QuerySyntax from '../QuerySyntax/index.jsx';
import queryBuilder from '../query-builder.js';  // eslint-disable-line

export default class SetinmentAnalysis extends Component {
  state = {
    showQuery: false
  }

  static propTypes = {
    sentiment: object.isRequired,
    sentiments: object.isRequired,
    query: shape({
      text: string,
      date: object,
    })
  }

  onShowQuery = () => {
    this.setState({ showQuery: true });
  }

  onShowResults = () => {
    this.setState({ showQuery: false });
  }

  filterEmptySentimentResults(sentiments) {
    return sentiments.results.filter((result) =>  {
      return result.aggregations[0].results.length > 0;
    });
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
                      href="#" onClick={this.onShowQuery}
                    >
                      View Query
                    </button>
                  </div>
                  <p className="base--p sentiment--description">
                    Extract sentiment from news articles across a variety of news sources (10 random sources used below).
                  </p>
                  <SentimentChart
                    sentiment={sentiment}
                    showLabels
                    size="large"
                  />
                  <SentimentBySource
                    sentiments={
                      this.filterEmptySentimentResults(sentiments)
                    }
                  />
                </div>
              )
            : (
                <QuerySyntax
                  title="Sentiment Analysis"
                  query={queryBuilder.build(query, true)}
                  response={{
                    sentiment: sentiment,
                    sentiments: sentiments
                  }}
                  onGoBack={this.onShowResults}
                />
              )
        }
      </div>
    );
  }
}
