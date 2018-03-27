import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './latestBlogEntries.scss';

const Latest = ({ entry }) => (
  <Link className={styles.entry} to={`/blog/${entry.url}`}>
    <div className={styles.title}>
      {entry.title}
    </div>
    <div className={styles.excerpt}>
      {entry.excerpt}
    </div>
  </Link>
);

Latest.propTypes = {
  entry: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    excerpt: PropTypes.string,
  }).isRequired,
};

export default Latest;
