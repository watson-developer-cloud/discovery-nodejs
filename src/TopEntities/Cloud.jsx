import React from 'react';
import {
  string, number, shape, arrayOf,
} from 'prop-types';

function Cloud({ data, maxSize, minSize }) {
  const largest = data
    ? data.reduce((prev, cur) => (cur.matching_results > prev
      ? cur.matching_results
      : prev), 0)
    : 0;
  const ratio = maxSize / largest;
  const computeSize = (value) => Math.max(minSize, value * ratio);

  return (
    <div className="top-entities--cloud">
      {
        data
          ? data.map((item) => (
            <div
              className="top-entities--word"
              key={`${item.key}`}
              title={item.matching_results}
              style={{
                fontSize: `${computeSize(item.matching_results)}px`,
                fontWeight: (
                  computeSize(item.matching_results) < 13
                    ? 400
                    : null
                ),
              }}
            >
              {item.key}
            </div>
          ))
          : []
      }
    </div>
  );
}

Cloud.propTypes = {
  data: arrayOf(shape({
    key: string.isRequired,
    matching_results: number.isRequired,
  })).isRequired,
  maxSize: number,
  minSize: number,
};

Cloud.defaultProps = {
  maxSize: 28,
  minSize: 12,
};

export default Cloud;
