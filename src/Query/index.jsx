import React from 'react';
import { object, shape, string, bool, func } from 'prop-types';
import Collapsed from './Collapsed.jsx';
import Expanded from './Expanded.jsx';

Query.propTypes = {
  query: shape({
    text: string,
    date: object,
    sort: string,
    dateRangeRestricted: bool,
  }),
  onQueryChange: func.isRequired,
}

export default function Query({ query, onQueryChange }) {
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
