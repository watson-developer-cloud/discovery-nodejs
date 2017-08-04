import React, { Component } from 'react';
import { func } from 'prop-types';
import moment from 'moment';

import { TextInput, Icon } from 'watson-react-components';

export default class QueryExpanded extends Component {
  static propTypes = {
    onQueryChange: func.isRequired,
  }

  state = {
    query: null,
  }

  handleInputChange = (event) => {
    this.setState({
      query: {
        text: event.target.value,
        date: {
          from: moment().subtract(2, 'months').format('YYYYMMDD'),
          to: moment().format('YYYYMMDD'),
        },
      },
    });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter' && event.target.value.match(/[^\s]+/)) {
      this.props.onQueryChange(this.state.query);
    }
  }

  handleSearchClick = () => {
    if (this.state.query && this.state.query.text.match(/[^\s]+/)) {
      this.props.onQueryChange(this.state.query);
    }
  }

  render() {
    return (
      <section className="_full-width-row query">
        <div className="query--right-bg" />
        <div className="row query--row _container _container_large">
          <div className="query--left">
            <div className="query--search-container">
              <TextInput
                placeholder="What company are you interested in?"
                onKeyPress={this.handleKeyPress}
                onInput={this.handleInputChange}
                defaultValue={this.state.query ? this.state.query.text : null}
              />
              <button
                type="button"
                onClick={this.handleSearchClick}
                className="query--icon-container"
              >
                <Icon type="search" size="regular" fill="#ffffff" />
              </button>
            </div>
          </div>
          <div className="query--right">
            <p className="base--p query--query-description">This interactive demo shows how to query news content to</p>
            <ul className="base--ul query--query-list">
              <li className="base--li query--query-list-item">Find top entities (people, topics, companies)</li>
              <li className="base--li query--query-list-item">Extract sentiment over time</li>
              <li className="base--li query--query-list-item">Sentiment Analysis</li>
              <li className="base--li query--query-list-item">Analyze most frequently co-mentioned entities</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}
