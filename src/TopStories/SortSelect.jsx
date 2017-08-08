import React from 'react';
import { string, func } from 'prop-types';
import { Icon } from 'watson-react-components';

function SortSelect({ onChange, currSelected }) {
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
        <Icon type="right" />
      </span>
    </span>
  );
}

SortSelect.propTypes = {
  onChange: func.isRequired,
  currSelected: string.isRequired,
};

export default SortSelect;
