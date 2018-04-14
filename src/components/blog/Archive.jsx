import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './archive.scss';

const Archive = ({ archive }) => {
  const years = archive.map((year) => {
    const entries = year.entries.map((entry) => (
      <div className={styles.entry} key={entry.url}>
        <Link to={`/blog/${entry.url}`}>
          {entry.title}
        </Link>
        <div className={styles.published}>
          {entry.published.month} {entry.published.date} {entry.published.year}
        </div>
      </div>
    ));

    return (
      <div className={styles.year} key={year.year}>
        <h2>{year.year}</h2>
        {entries}
      </div>
    )
  });

  return (
    <div className={styles.archive}>
      {years}
    </div>
  );
};

Archive.propTypes = {
  archive: PropTypes.arrayOf(
    PropTypes.shape({
      entries: PropTypes.arrayOf(
        PropTypes.object,
      ),
      year: PropTypes.number,
    }).isRequired,
  ).isRequired,
};

export default Archive;
