import React, { PropTypes } from 'react';
import { Icon } from 'watson-react-components';

const NoContent = (props) => (
  <div className="no-content--wrapper">
    <div className="no-content--icon">
      <Icon style={{ width: '3.7rem', height: '3.7rem', fill: '#00bfb0' }} type="info" />
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

// <p className={props.query.restrictedDateRange ? 'no-content--timeframe' : 'hidden'}>
//   Try setting the timeframe to 'Last 2 Months'.
// </p>

NoContent.propTypes = {
  query: PropTypes.object,
  message: PropTypes.string
};

export default NoContent;
