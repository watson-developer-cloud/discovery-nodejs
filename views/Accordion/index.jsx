import React from 'react';
import classNames from 'classnames';
import { Icon } from 'watson-react-components';

const Accordion = props => (
  <div className="accordion">
    <div
      className={classNames(
        'accordion--row',
        { close: !props.show }
      )}
      onClick={props.onClickToggle ? props.onClickToggle : null}
    >
      <div className="accordion--icon-container">
        <Icon type="right" />
      </div>
      <div className="accordion--header">
        {props.header}
      </div>
    </div>
    <div className="accordion--content">
      <div className="accordion--inner-content">
        {props.content}
      </div>
    </div>
  </div>
);

Accordion.propTypes = {
  show: React.PropTypes.bool,
  content: React.PropTypes.element.isRequired,
  header: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string,
  ]).isRequired,
  onClickToggle: React.PropTypes.func,
};

Accordion.defaultProps = {
  show: false,
};


export default Accordion;
