import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './pagination.scss';

const range = 2;

const Pagination = ({ pageOrUrlKey, totalPages }) => {
  if (!/^[0-9]+$/.test(pageOrUrlKey)) {
    return (
      <div className={styles.pagination}>
        <div className={styles['read-more']}>
          <Link to="/blog">
            <div className={styles.label}>
              View More Entries
              <span className={styles['arrow-right']} />
            </div>
          </Link>
        </div>
      </div>
    );
  }

  const currentPage = parseInt(pageOrUrlKey, 10);
  let previous = '';
  let next = '';
  const pages = [];

  if (currentPage > 1) {
    const url = currentPage === 2 ? '/blog' : `/blog/${currentPage - 1}`;

    previous = (
      <div className={styles.previous}>
        <Link to={url}>
          <div className={styles.label}>
            <span className={styles['arrow-left']} />
            Previous
          </div>
        </Link>
      </div>
    );
  }

  if (currentPage < totalPages) {
    next = (
      <div className={styles.next}>
        <Link to={`/blog/${currentPage + 1}`}>
          <div className={styles.label}>
            Next
            <span className={styles['arrow-right']} />
          </div>
        </Link>
      </div>
    );
  }

  const pagesFrom = Math.max(currentPage - range, 1);
  const pagesTo = Math.min(currentPage + range, totalPages);

  for (let i = pagesFrom; i <= pagesTo; i += 1) {
    const url = i === 1 ? '/blog' : `/blog/${i}`;

    pages.push(
      <NavLink
        key={i}
        exact to={url}
        activeClassName={styles.active}
        className={styles['page-link']}
      >
        {i}
      </NavLink>,
    );
  }

  return (
    <div className={styles.pagination}>
      {previous}
      {pages}
      {next}
    </div>
  );
};

Pagination.propTypes = {
  pageOrUrlKey: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Pagination;
