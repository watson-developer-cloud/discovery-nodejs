import React from 'react';
import {
  string, bool, func, shape,
} from 'prop-types';
import Collapsed from './Collapsed';
import Expanded from './Expanded';

function Query({ query, onQueryChange }) {
  return (
    (query && query.text)
      ? (
        <Collapsed query={query} onQueryChange={onQueryChange} />
      )
      : (
        <Expanded onQueryChange={onQueryChange} />
      )
  );
}

Query.propTypes = {
  onQueryChange: func.isRequired,
  query: shape({
    text: string.isRequired,
    date: shape({
      from: string.isRequired,
      to: string.isRequired,
    }).isRequired,
    sort: string,
    restrictedDateRange: bool,
  }),
};

Query.defaultProps = {
  query: null,
};

export default Query;
