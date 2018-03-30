import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Archive = ({ year }) => {
  const entries = [];

  year.entries.forEach((entry) => {
    entries.push(
      <div className="entry" key={entry.url}>
        <Link to={`/blog/${entry.url}`}>
          {entry.title}
        </Link>
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
  year: PropTypes.shape({
    entries: PropTypes.array,
    year: PropTypes.number,
  }).isRequired,
};

export default Archive;
