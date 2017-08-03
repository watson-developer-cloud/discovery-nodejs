import React from 'react';
import { string, bool, shape } from 'prop-types';

NoResults.propTypes = {
  query: shape({
    text: string,
    restrictedDateRange: bool
  })
}

export default function NoResults({ query }) {
  return (
    <div style={{ width: '100%', textAlign: 'center', marginBottom: '5rem' }}>
      <p className="base--h2">There are no results for:</p>
        <div className="query--no-results-wrapper">
          <div className="query--no-results base--h2">
            {
              query
                ? query.text
                : ''
            }
          </div>
        </div>
        <p className='base--h3'>
          {
            ( query && query.restrictedDateRange )
              ? (
                  "Try expanding the timeframe."
                )
              : (
                  "Try modifying your query."
                )
          }
      </p>
    </div>
  );
}
