import React from 'react';
import PropTypes from 'prop-types';

const Archive = ({ year }) => {
  const entries = [];

  year.entries.forEach((entry) => {
    entries.push(
      <div className="entry" key={entry.url}>
        <a href={`/blog/${entry.url}`}>
          {entry.title}
        </a>
        <div className="published">
          {entry.published.month} {entry.published.date} {entry.published.year}
        </div>
      </div>,
    );
  });

  return (
    <div className="year">
      <h2>{year.year}</h2>
      {entries}
    </div>
  );
};

Archive.propTypes = {
  year: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
  ])).isRequired,
};

export default Archive;
