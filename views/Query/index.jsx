import React from 'react';
import Collapsed from './Collapsed.jsx';
import Expanded from './Expanded.jsx';

const Query = props => (
  (props.query && props.query.text) ?
    <Collapsed query={props.query} onQueryChange={props.onQueryChange} /> :
    <Expanded onQueryChange={props.onQueryChange} />
);

Query.propTypes = {
  query: React.PropTypes.shape({
    text: React.PropTypes.string,
    date: React.PropTypes.object,
    sort: React.PropTypes.string,
    dateRangeRestricted: React.PropTypes.bool,
  }),
  onQueryChange: React.PropTypes.func.isRequired,
};


export default Query;
