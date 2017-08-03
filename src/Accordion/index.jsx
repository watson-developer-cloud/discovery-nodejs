import React from 'react';
import { string, bool, element, oneOfType, func } from 'prop-types';
import classNames from 'classnames';
import { Icon } from 'watson-react-components';

Accordion.propTypes = {
  show: bool,
  content: element.isRequired,
  header: oneOfType([
    element,
    string,
  ]).isRequired,
  onClickToggle: func
}

export default function Accordion({ show = false, content, header, onClickToggle }) {
  return (
    <div className="accordion">
      <div
        className={
          classNames('accordion--row', { close: !show })
        }
        onClick={ onClickToggle ? onClickToggle : null }
      >
        <div className="accordion--icon-container">
          <Icon type="right" />
        </div>
        <div className="accordion--header">
          { header }
        </div>
      </div>
      <div className="accordion--content">
        <div className="accordion--inner-content">
          { content }
        </div>
      </div>
    </div>
  );
}
