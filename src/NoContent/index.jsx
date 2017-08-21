import React from 'react';
import { string, bool, shape } from 'prop-types';
import { Icon } from 'watson-react-components';

function NoContent({ message, query }) {
  return (
    <div className="no-content--wrapper">
      <div className="no-content--icon">
        <Icon type="info" />
      </div>
      <div className="no-content--messages">
        <p className="no-content--set-message">
          { message }
        </p>
        <p className="no-content--recommendations">
          {
            query.restrictedDateRange
              ? (
                'Try expanding the timeframe.'
              )
              : (
                'Try modifying your query.'
              )
          }
        </p>
      </div>
    </div>
  );
}

NoContent.propTypes = {
  query: shape({
    restrictedDateRange: bool,
  }).isRequired,
  message: string.isRequired,
};

export default NoContent;
