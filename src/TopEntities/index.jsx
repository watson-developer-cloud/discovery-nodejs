import React, { Component } from 'react';
import { string, object, shape } from 'prop-types';
import { Tabs, Pane } from 'watson-react-components';
import Cloud from './Cloud.jsx';
import QuerySyntax from '../QuerySyntax/index.jsx';
import queryBuilder from '../query-builder.js';  // eslint-disable-line
import NoContent from '../NoContent/index.jsx';

export default class TopEntities extends Component {
  static propTypes = {
    entities: object.isRequired,
    query: shape({
      text: string,
      date: object
    })
  }

  state = {
    showQuery: false
  }

  onShowQuery = () => {
    this.setState({ showQuery: true });
  }

  onShowResults = () => {
    this.setState({ showQuery: false });
  }

  getCompanies() {
    const { entities: { companies }, query } = this.props;

    if (!companies) {
      return [];
    }

    return companies.filter((item) => {
      return item.key.toLowerCase() !== query.text.toLowerCase();
    });
  }

  render() {
    const { entities: { topics, companies, people }, query } = this.props;

    return (
      <div>
        {
          !this.state.showQuery
            ? (
                <div className="top-entities widget">
                  <div className="widget--header">
                    <h2 className="base--h2 widget--header-title">
                      Top Entities
                    </h2>
                    <div className="widget--header-spacer" />
                    <button
                      className="base--button widget--header-button"
                      href="#"
                      onClick={this.onShowQuery}
                    >
                      View Query
                    </button>
                  </div>
                  <p className="base--p top-entities--description">
                    Easily extract frequently mentioned entities - such as people, topics and companies with Pre-enriched News.
                  </p>
                  <Tabs selected={0}>
                    <Pane label="Topics">
                      {
                        topics.length > 0
                          ? (
                              <Cloud data={topics} />
                            )
                          : (
                              <NoContent
                                query={query}
                                message={'No Topics found.'}
                              />
                            )
                      }
                    </Pane>
                    <Pane label="Companies">
                      {
                        companies.length > 0
                          ? (
                              <Cloud
                                data={this.getCompanies()}
                              />
                            )
                          : (
                              <NoContent
                                query={query}
                                message={'No Companies found.'}
                              />
                            )
                      }
                    </Pane>
                    <Pane label="People">
                      {
                        people.length > 0
                          ? (
                              <Cloud data={people} />
                            )
                          : (
                              <NoContent
                                query={query}
                                message={'No People found.'}
                              />
                            )
                      }
                    </Pane>
                  </Tabs>
                </div>
              )
            : (
                <QuerySyntax
                  title="Top Entities"
                  query={queryBuilder.build(query, true)}
                  response={this.props.entities}
                  onGoBack={this.onShowResults}
                />
              )
        }
      </div>
    );
  }
}
