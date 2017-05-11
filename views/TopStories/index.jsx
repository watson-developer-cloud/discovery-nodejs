import React, { PropTypes } from 'react';
import QuerySyntax from '../QuerySyntax/index.jsx';
import queryBuilder from '../../query-builder.js';  // eslint-disable-line
import moment from 'moment';
import { Icon } from 'watson-react-components';

const Story = props => (
  <div className="story">
      <div className="story--date">
        {moment(props.date*1000).format("M/D/YYYY hh:MMa")}
      </div>
    <a
      className="story--title base--a results--a"
      href={props.url}
      target="_blank"
      title={props.title}
      rel="noopener noreferrer"
    >
      {props.title}
    </a>
    <div className="story--source-and-score">
      <span className="base--p story--source">
        {props.host ? props.host : 'Placeholder Source'}
      </span>
      <span className="story--source-score-divider"> | </span>
      <span className="story--score base--p">
        <span>Score:   </span>
        {props.score}
      </span>
    </div>
  </div>
);

const Select = props => (
  <span>
    <select name="sort-select" id="sort-by" className="base--select sort--select" onChange={props.onChange} value={props.currSelected}>
      <option value="relevance">Relevance</option>
      <option value="date">Date</option>
    </select>
    <span className="sort-select--icon">
      <Icon style={{ transform: 'rotateZ(90deg)', width: '0.8rem', height: '0.8rem', fill: '#5A5A5A' }} type="right" />
    </span>
  </span>
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
    onSortChange: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      showQuery: false,
      sortType: (typeof this.props.query.sort === 'undefined' || this.props.query.sort == '') ? 'relevance' : 'date',
    };
  },

  onShowQuery() {
    this.setState({ showQuery: true });
  },

  onShowResults() {
    this.setState({ showQuery: false });
  },

  onChangeSort(e) {
    this.setState({ sortType: e.target.value });
    let sortVal = e.target.value;
    let newQuery = Object.assign({}, this.props.query, {
      sort: sortVal
    });
    this.props.onSortChange(newQuery);
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
            <div className="sort-option">
              <span id="sort-label">
                Sort by:
              </span>
              <span>
                <Select onChange={this.onChangeSort} currSelected={this.state.sortType}/>
              </span>
            </div>
            <div className="top-stories--list">
              {this.props.stories.map(item =>
                <Story
                  key={item.id}
                  title={item.enrichedTitle ? item.enrichedTitle.text : (item.title || 'Untitled')}
                  url={item.url}
                  host={item.host}
                  date={item.blekko.chrondate}
                  score={item.score}
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
