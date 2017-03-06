import 'whatwg-fetch';
import React from 'react';
import { Icon } from 'watson-react-components';

import Query from './Query/index.jsx';
import TopEntities from './TopEntities/index.jsx';
import TopStories from './TopStories/index.jsx';
import SentimentAnalysis from './SentimentAnalysis/index.jsx';
import MentionsAndSentiments from './MentionsAndSentiments/index.jsx';
import NoResults from './NoResults/index.jsx';

const hasResults = (entities) =>
  entities.aggregations && entities.aggregations.length > 0 &&
  entities.aggregations[0].field === 'enrichedTitle.entities.text';

const parseQueryResults = (data) => {
  const parsedData = {
    results: data.results, // Top Results
    entities: {}, // Topic cloud
    sentiments: null, // Sentiment by source
    sentiment: null, // Overall sentiment
    mentions: null, // Mentions and Sentiments
  };

  data.aggregations.forEach((aggregation) => {
    // sentiments by source
    if (aggregation.type === 'term' && aggregation.field.startsWith('blekko.basedomain')) {
      parsedData.sentiments = aggregation;
    }
    // Overall sentiment
    if (aggregation.type === 'term' && aggregation.field.startsWith('docSentiment')) {
      parsedData.sentiment = aggregation;
    }

    if (aggregation.type === 'term' && aggregation.field === 'enrichedTitle.concepts.text') {
      parsedData.entities.topics = aggregation.results;
    }

    // Mentions and sentiments
    if (aggregation.type === 'filter' &&
      'aggregations' in aggregation &&
      aggregation.aggregations[0].field === 'enrichedTitle.entities.text') {
      parsedData.mentions = aggregation;
    }

    if (aggregation.type === 'nested' && aggregation.path === 'enrichedTitle.entities') {
      const entities = aggregation.aggregations;
      if (entities && entities.length > 0 && hasResults(entities[0])) {
        if (entities[0].match === 'Company') {
          parsedData.entities.companies = entities[0].aggregations[0].results;
        }
        if (entities[0].match === 'Person') {
          parsedData.entities.people = entities[0].aggregations[0].results;
        }
      }
    }
  });

  return parsedData;
};

export default React.createClass({
  displayName: 'Demo',

  getInitialState() {
    return {
      query: null,  // object that has text and date
      error: null,
      data: null,
      loading: false,
    };
  },

  handleQueryChange(query) {
    this.fetchNewData(query);
  },
  /**
   * Call the query API every time the query change.
   */
  fetchNewData(query) {
    this.setState({ query, loading: true });
    fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
    })
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((json) => {
            this.setState({ loading: false, data: parseQueryResults(json) });
          });
      } else {
        response.json()
        .then((error) => this.setState({ error, loading: false }))
        .catch((errorMessage) => {
          console.error(errorMessage);
          this.setState({
            error: { error: 'There was a problem with the request, please try again' },
            loading: false,
          });
        });
      }
    });
    // scroll to the loading bar
    window.scrollTo(100, 344);
  },

  render() {
    return (
      <div>
        <Query onQueryChange={this.handleQueryChange} query={this.state.query} />
        { this.state.loading ?
          (
            <div className="results">
              <div className="loader--container">
                <Icon type="loader" size="large" />
              </div>
            </div>) : null }
        { !this.state.loading && this.state.data && this.state.data.results.length > 0 ? (
          <div className="results">
            <div className="_container _container_large">
              <div className="row">
                <div className="results--panel-1">
                  <TopEntities
                    query={this.state.query}
                    entities={this.state.data.entities}
                    onShowCode={this.toggleTopEntities}
                  />
                </div>
                <div className="results--panel-2">
                  <TopStories
                    query={this.state.query}
                    stories={this.state.data.results}
                    onShowCode={this.toggleTopResults}
                  />
                </div>
              </div>
              <div className="row">
                <div className="results--panel-3">
                  <SentimentAnalysis
                    query={this.state.query}
                    sentiment={this.state.data.sentiment}
                    sentiments={this.state.data.sentiments}
                  />
                </div>
              </div>
              <div className="row">
                <div className="results--panel-4">
                  <MentionsAndSentiments
                    query={this.state.query}
                    mentions={this.state.data.mentions}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null }
        { !this.state.loading && this.state.data && this.state.data.results.length === 0 ?
          <NoResults query={this.state.query} />
        : null }
      </div>
    );
  },
});
