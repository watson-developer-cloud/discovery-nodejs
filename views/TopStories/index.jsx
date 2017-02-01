import React, { PropTypes } from 'react';
import QuerySyntax from '../QuerySyntax/index.jsx';
import queryBuilder from '../../query-builder.js';  // eslint-disable-line

const Story = props => (
  <div className="story">
    <a
      className="story--title base--a results--a"
      href={props.url}
      target="_blank"
      title={props.title}
      rel="noopener noreferrer"
    >
      {props.title}
    </a>
    <p className="base--p story--source">
      {props.host ? props.host : 'Placeholder Source'}
    </p>
  </div>
);

Story.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  host: PropTypes.string, //TODO make this required
};

export default React.createClass({
  displayName: 'TopStories',

  propTypes: {
    stories: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
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

  render() {
    return (
      <div>
        {!this.state.showQuery ? (
          <div className="top-stories widget">
            <div className="widget--header">
              <h2 className="base--h2 widget--header-title">Top Stories</h2>
              <div className="widget--header-spacer" />
              <button
                className="base--button widget--header-button"
                href="#" onClick={this.onShowQuery}
              >
                View Query
              </button>
            </div>
            <p className="base--p top-stories--description">
              Find the most recent and relevant news articles.
            </p>
            <div className="top-stories--list">
              {this.props.stories.map(item =>
                <Story
                  key={item.id}
                  title={item.enrichedTitle ? item.enrichedTitle.text : (item.title || 'Untitled')}
                  url={item.url}
                  host={item.host}
                />)
              }
            </div>
          </div>
        ) : (
          <QuerySyntax
            title="Top Stories"
            query={queryBuilder.build(this.props.query, true)}
            response={{ results: this.props.stories }}
            onGoBack={this.onShowResults}
          />
        )
      }
      </div>
    );
  },
});
