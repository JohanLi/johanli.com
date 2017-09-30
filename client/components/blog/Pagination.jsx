import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const range = 2;

const Pagination = ({ pageOrUrlKey, totalPages }) => {
  if (isNaN(pageOrUrlKey)) {
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

  if (pageOrUrlKey > 1) {
    previous = (
      <div className="previous">
        <Link to={`/blog/${currentPage - 1}`}>
          <div className="label">
            <span className="arrow-left" />
            Previous
          </div>
        </Link>
      </div>
    );
  }

  if (pageOrUrlKey < totalPages) {
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

  const pagesFrom = Math.max(pageOrUrlKey - range, 1);
  const pagesTo = Math.min(pageOrUrlKey + range, totalPages);

  for (let i = pagesFrom; i <= pagesTo; i += 1) {
    pages.push(
      <NavLink key={i} exact to={`/blog/${i}`}>
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
