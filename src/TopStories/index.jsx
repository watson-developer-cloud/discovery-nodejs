import React, { Component } from 'react';
import { string, object, arrayOf, shape } from 'prop-types';
import WidgetHeader from '../WidgetHeader/index';
import QuerySyntax from '../QuerySyntax/index';
import queryBuilder from '../query-builder';
import Story from './Story';
import { fields } from '../fields';

export default class TopStories extends Component {
  static widgetTitle() {
    return 'Top Stories';
  }

  static widgetDescription() {
    return 'Discovery can pull a list of the most recent and relevant news articles about this company.';
  }

  static propTypes = {
    stories: arrayOf(object).isRequired,
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
    const { stories, query } = this.props;

    return (
      <div>
        {!this.state.showQuery ? (
          <div className="top-stories widget">
            <WidgetHeader
              title={TopStories.widgetTitle()}
              description={TopStories.widgetDescription()}
              onShowQuery={this.onShowQuery}
            />
            <div className="top-stories--list">
              {stories.map(item => (
                <Story
                  key={item.id}
                  title={item[fields.title] || 'Untitled'}
                  url={item[fields.url]}
                  host={item[fields.host]}
                  date={item[fields.publication_date]}
                  score={item.score}
                />
              ))}
            </div>
          </div>
        ) : (
          <QuerySyntax
            title="Top Stories"
            query={queryBuilder.build(query, queryBuilder.widgetQueries.topStories)}
            response={{ results: stories }}
            onGoBack={this.onShowResults}
          />
        )}
      </div>
    );
  }
}
