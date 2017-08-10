import React from 'react';
import classNames from 'classnames';
import { string, number, func, shape, arrayOf } from 'prop-types';
import AnomalyDetection from './index';
import './style.css';

const getArticles = payload =>
  (payload && payload.matching_results ? payload.matching_results : 0);

const getTitle = payload =>
  (payload
    && payload.aggregations
    && payload.aggregations.length > 0
    && payload.aggregations[0].hits
    && payload.aggregations[0].hits.hits
    && payload.aggregations[0].hits.hits.length > 0
    && payload.aggregations[0].hits.hits[0].title
    ? payload.aggregations[0].hits.hits[0].title
    : 'No Title');

function AnomalyTooltip({ label, payload, labelFormatter }) {
  const realPayload = payload && payload.length > 0
    ? payload[0].payload
    : {};
  const anomaly = AnomalyDetection.hasAnomaly(realPayload);
  const articles = getArticles(realPayload);

  return (
    <div className="anomaly-tooltip--div">
      <p className="recharts-tooltip-label">
        { labelFormatter(label) }
      </p>
      <p className="anomaly-tooltip-title--p">
        { getTitle(realPayload) }
      </p>
      <p className="anomaly-tooltip-data--p">
        <span
          className={
            classNames('anomaly-tooltip-articles--span', { anomaly })
          }
        >
          { articles } { articles === 1 ? 'Article' : 'Articles' }
        </span>
        {
          anomaly && (
            <span className="anomaly-tooltip-flag--span"> (Anomalous)</span>
          )
        }
      </p>
    </div>
  );
}

AnomalyTooltip.propTypes = {
  label: string,
  labelFormatter: func,
  payload: arrayOf(shape({
    payload: shape({
      anomaly: number,
      matching_results: number,
      aggregations: arrayOf(shape({
        hits: shape({
          hits: arrayOf(shape({
            title: string,
          })),
        }),
      })),
    }),
  })),
};

AnomalyTooltip.defaultProps = {
  label: '',
  labelFormatter: input => input,
  payload: [],
};

export default AnomalyTooltip;
