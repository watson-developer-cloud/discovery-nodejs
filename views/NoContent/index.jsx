import React, { PropTypes } from 'react';
import { Icon } from 'watson-react-components';

const NoContent = (props) => (
  <div className="no-content--wrapper">
    <div className="no-content--icon">
      <Icon type="info" />
    </div>
    <div className='no-content--messages'>
    <p className='no-content--set-message'>{props.message}</p>
    <p className='no-content--recommendations'>
      {props.query.restrictedDateRange ? (
        "Try expanding the timeframe."
      ) : (
        "Try modifying your query."
      )}
    </p>
    </div>
  </div>
);

NoContent.propTypes = {
  query: PropTypes.object,
  message: PropTypes.string
};

export default NoContent;
