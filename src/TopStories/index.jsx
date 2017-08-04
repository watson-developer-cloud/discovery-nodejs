import React, { Component } from 'react';
import { string, object, func, arrayOf, shape } from 'prop-types';
import QuerySyntax from '../QuerySyntax/index';
import queryBuilder from '../query-builder';
import Story from './Story';
import SortSelect from './SortSelect';
import { fields } from '../fields';

export default class TopStories extends Component {
  static propTypes = {
    stories: arrayOf(object).isRequired,
    query: shape({
      text: string.isRequired,
      date: shape({
        from: string.isRequired,
        to: string.isRequired,
      }).isRequired,
    }).isRequired,
    onSortChange: func.isRequired,
  }

  state = {
    showQuery: false,
    sortType: (typeof this.props.query.sort === 'undefined' || this.props.query.sort === 'relevance') ? 'relevance' : 'date',
  }

  onShowQuery = () => {
    this.setState({ showQuery: true });
  }

  onShowResults = () => {
    this.setState({ showQuery: false });
  }

  onChangeSort = (e) => {
    this.setState({ sortType: e.target.value });
    const sortVal = e.target.value;
    const newQuery = Object.assign({}, this.props.query, {
      sort: sortVal,
    });
    this.props.onSortChange(newQuery);
  }

  render() {
    const { stories, query } = this.props;

    return (
      <div>
        {
          !this.state.showQuery
            ? (
              <div className="top-stories widget">
                <div className="widget--header">
                  <h2 className="base--h2 widget--header-title">
                      Top Stories
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
                <p className="base--p top-stories--description">
                    Find the most recent and relevant news articles.
                </p>
                <div className="sort-option">
                  <span id="sort-label">
                      Sort by:
                  </span>
                  <span>
                    <SortSelect
                      onChange={this.onChangeSort}
                      currSelected={this.state.sortType}
                    />
                  </span>
                </div>
                <div className="top-stories--list">
                  {
                    stories.map(item =>
                      (<Story
                        key={item.id}
                        title={(item[fields.title] || 'Untitled')}
                        url={item[fields.url]}
                        host={item[fields.host]}
                        date={item[fields.publication_date]}
                        score={item.score}
                      />))
                  }
                </div>
              </div>
            )
            : (
              <QuerySyntax
                title="Top Stories"
                query={queryBuilder.build(query, true)}
                response={{ results: stories }}
                onGoBack={this.onShowResults}
              />
            )
        }
      </div>
    );
  }
}
