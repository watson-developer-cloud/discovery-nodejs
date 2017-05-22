import React, { PropTypes } from 'react';

const NoResults = (props) => (
  <div style={{ width: '100%', textAlign: 'center', marginBottom: '5rem' }}>
  <p className="base--h2">There are no results for:</p>
    <div className="query--no-results-wrapper">
      <div className="query--no-results base--h2">
        {props.query ? props.query.text : '' }
      </div>
    </div>
    <p className='base--h3'>
    {props.query.restrictedDateRange ? (
      "Try expanding the timeframe."
    ) : (
      "Try modifying your query."
    )}
    </p>
  </div>
);

NoResults.propTypes = {
  query: PropTypes.object,
};

export default NoResults;
