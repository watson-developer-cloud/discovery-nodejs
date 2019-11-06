import React from 'react';
import moment from 'moment';
import { string, number } from 'prop-types';

function Story({
  date, host, score, title, url,
}) {
  return (
    <div className="story">
      <div className="story--date">
        { moment(date).format('M/D/YYYY hh:MMa') }
      </div>
      <a
        className="story--title base--a results--a"
        href={url}
        target="_blank"
        title={title}
        rel="noopener noreferrer"
      >
        {title}
      </a>
      <div className="story--source-and-score">
        <span className="base--p story--source">
          { host }
        </span>
        <span className="story--source-score-divider"> | </span>
        <span className="story--score base--p">
          <span>
Score:
            { score }
          </span>
        </span>
      </div>
    </div>
  );
}

Story.propTypes = {
  date: string.isRequired,
  host: string,
  score: number.isRequired,
  title: string.isRequired,
  url: string.isRequired,
};

Story.defaultProps = {
  host: 'Placeholder Source',
};

export default Story;
