import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const range = 2;

const Pagination = ({ pageOrUrlKey, totalPages }) => {
  if (Number.isNaN(pageOrUrlKey)) {
    return (
      <div className="pagination">
        <div className="read-more">
          <Link to="/blog">
            <div className="label">
              View More Entries
              <span className="arrow-right" />
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
      <div className="previous">
        <Link to={url}>
          <div className="label">
            <span className="arrow-left" />
            Previous
          </div>
        </Link>
      </div>
    );
  }

  if (currentPage < totalPages) {
    next = (
      <div className="next">
        <Link to={`/blog/${currentPage + 1}`}>
          <div className="label">
            Next
            <span className="arrow-right" />
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
      <NavLink key={i} exact to={url} className="page-link">
        {i}
      </NavLink>,
    );
  }

  return (
    <div className="pagination">
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
