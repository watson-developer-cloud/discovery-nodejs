import React from 'react';
import { string, func } from 'prop-types';
import { Icon } from 'watson-react-components';

SortSelect.propTypes = {
  onChange: func.isRequired,
  currSelected: string.isRequired
}

export default function SortSelect({ onChange, currSelected }){
  return (
    <span>
      <select
        name="sort-select"
        id="sort-by"
        className="base--select sort--select"
        onChange={onChange}
        value={currSelected}
      >
        <option value="relevance">Relevance</option>
        <option value="date">Date</option>
      </select>
      <span className="sort-select--icon">
        <Icon
          style={{
            transform: 'rotateZ(90deg)',
            width: '0.8rem',
            height: '0.8rem',
            fill: '#5A5A5A'
          }}
          type="right" />
      </span>
    </span>
  );
}
