import React, { Component } from 'react';
import { string, number, shape, arrayOf } from 'prop-types';
import WidgetHeader from '../WidgetHeader/index';
import SentimentChart from './SentimentChart';
import SentimentBySource from './SentimentBySource';
import QuerySyntax from '../QuerySyntax/index';
import { queryBuilder } from '../query-builder';

export default class SentimentAnalysis extends Component {
  static widgetTitle() {
    return 'Sentiment Analysis';
  }

  static widgetDescription() {
    return 'Sentiment can be extracted from news articles across a variety of sources.';
  }

  static filterEmptySentimentResults(sentiments) {
    return sentiments.results.filter(result => result.aggregations[0].results.length > 0);
  }

  static propTypes = {
    sentiment: shape({
      results: arrayOf(
        shape({
          key: string.isRequired,
          matching_results: number.isRequired,
        })
      ).isRequired,
    }).isRequired,
    sentiments: shape({
      results: arrayOf(
        shape({
          key: string.isRequired,
          aggregations: arrayOf(
            shape({
              results: arrayOf(
                shape({
                  key: string.isRequired,
                })
              ).isRequired,
            })
          ).isRequired,
        })
      ).isRequired,
    }).isRequired,
    query: shape({
      text: string.isRequired,
      date: shape({
        from: string.isRequired,
        to: string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    showQuery: false,
  };

  onShowQuery = () => {
    this.setState({ showQuery: true });
  };

  onShowResults = () => {
    this.setState({ showQuery: false });
  };

  render() {
    const { sentiment, sentiments, query } = this.props;

    return (
      <div>
        {!this.state.showQuery ? (
          <div className="sentiment widget">
            <WidgetHeader
              title={SentimentAnalysis.widgetTitle()}
              description={SentimentAnalysis.widgetDescription()}
              onShowQuery={this.onShowQuery}
            />
            <SentimentChart sentiment={sentiment} showLabels size="large" />
            <SentimentBySource
              sentiments={SentimentAnalysis.filterEmptySentimentResults(sentiments)}
            />
          </div>
        ) : (
          <QuerySyntax
            title="Sentiment Analysis"
            query={queryBuilder.build(query, queryBuilder.widgetQueries.sentimentAnalysis)}
            response={{ sentiment, sentiments }}
            onGoBack={this.onShowResults}
          />
        )}
      </div>
    );
  }
}
