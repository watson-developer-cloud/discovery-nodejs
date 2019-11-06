import React, { Component } from 'react';
import { string, number, shape, arrayOf } from 'prop-types';
import { Tabs, Pane } from 'watson-react-components';
import WidgetHeader from '../WidgetHeader/index';
import Cloud from './Cloud';
import QuerySyntax from '../QuerySyntax/index';
import queryBuilder from '../query-builder';
import NoContent from '../NoContent/index';

export default class TopEntities extends Component {
  static widgetTitle() {
    return 'Top Entities';
  }

  static widgetDescription() {
    return 'Discovery can easily extract frequently mentioned entities - such as people, topics and companies - from the set of articles.';
  }

  static propTypes = {
    entities: shape({
      topics: arrayOf(
        shape({
          key: string.isRequired,
          matching_results: number.isRequired,
        })
      ).isRequired,
      companies: arrayOf(
        shape({
          key: string.isRequired,
          matching_results: number.isRequired,
        })
      ).isRequired,
      people: arrayOf(
        shape({
          key: string.isRequired,
          matching_results: number.isRequired,
        })
      ).isRequired,
    }).isRequired,
    query: shape({
      text: string.isRequired,
      date: shape({
        from: string.isRequired,
        to: string.isRequired,
      }),
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

  getCompanies() {
    const {
      entities: { companies },
      query,
    } = this.props;

    if (!companies) {
      return [];
    }

    return companies.filter(item => item.key.toLowerCase() !== query.text.toLowerCase());
  }

  render() {
    const {
      entities: { topics, companies, people },
      query,
    } = this.props;

    return (
      <div>
        {!this.state.showQuery ? (
          <div className="top-entities widget">
            <WidgetHeader
              title={TopEntities.widgetTitle()}
              description={TopEntities.widgetDescription()}
              onShowQuery={this.onShowQuery}
            />
            <Tabs selected={0}>
              <Pane label="Topics">
                {topics.length > 0 ? (
                  <Cloud data={topics} />
                ) : (
                  <NoContent query={query} message="No Topics found." />
                )}
              </Pane>
              <Pane label="Companies">
                {companies.length > 0 ? (
                  <Cloud data={this.getCompanies()} />
                ) : (
                  <NoContent query={query} message="No Companies found." />
                )}
              </Pane>
              <Pane label="People">
                {people.length > 0 ? (
                  <Cloud data={people} />
                ) : (
                  <NoContent query={query} message="No People found." />
                )}
              </Pane>
            </Tabs>
          </div>
        ) : (
          <QuerySyntax
            title="Top Entities"
            query={queryBuilder.build(query, queryBuilder.widgetQueries.topEntities)}
            response={this.props.entities}
            onGoBack={this.onShowResults}
          />
        )}
      </div>
    );
  }
}
