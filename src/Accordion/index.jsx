import React from 'react';
import {
  string, bool, node, oneOfType, func,
} from 'prop-types';
import classNames from 'classnames';
import { Icon } from 'watson-react-components';

function Accordion({
  content, header, onClickToggle, show,
}) {
  return (
    <div className="accordion">
      <button
        type="button"
        className={
          classNames('accordion--row', { close: !show })
        }
        onClick={onClickToggle || null}
      >
        <div className="accordion--icon-container">
          <Icon type="right" />
        </div>
        <div className="accordion--header">
          { header }
        </div>
      </button>
      <div className="accordion--content">
        <div className="accordion--inner-content">
          { content }
        </div>
      </div>
    </div>
  );
}

Accordion.propTypes = {
  content: node.isRequired,
  header: oneOfType([
    node,
    string,
  ]).isRequired,
  onClickToggle: func.isRequired,
  show: bool,
};

Accordion.defaultProps = {
  show: false,
};

export default Accordion;
