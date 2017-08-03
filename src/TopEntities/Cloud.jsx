import React from 'react';
import { object, number, arrayOf } from 'prop-types';

Cloud.propTypes = {
  data: arrayOf(object).isRequired,
  max_size: number,
  min_size: number
}

export default function Cloud({ data, max_size = 28, min_size = 12 }) {
  const largest = data
                    ? data.reduce((prev, cur) => {
                        return cur.matching_results > prev
                                ? cur.matching_results
                                : prev;
                      }, 0)
                    : 0;
  const ratio = max_size / largest;
  const computeSize = (value) => Math.max(min_size, value * ratio);

  return (
    <div className="top-entities--cloud">
      {
        data
          ? data.map((item, index) =>
              <div
                className="top-entities--word"
                key={`${index}-${item.key}`}
                title={item.matching_results}
                style={{
                  fontSize: `${computeSize(item.matching_results)}px`,
                  fontWeight: (
                    computeSize(item.matching_results) < 13
                      ? 400
                      : null
                  )
                }}
              >
                {item.key}
              </div>
            )
          : []
      }
    </div>
  );
}
