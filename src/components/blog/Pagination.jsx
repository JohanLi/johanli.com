import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Pagination = ({ pagination }) => {
  let previous = '';
  let next = '';
  const pages = [];

  if (Object.keys(pagination).length) {
    if (pagination.previous) {
      previous = (
        <div className="previous">
          <Link to={pagination.previous.url}>
            <div className="label">
              <span className="arrow-left" />
              Previous
            </div>
          </Link>
        </div>
      );
    }

    if (pagination.next) {
      next = (
        <div className="next">
          <Link to={pagination.next.url}>
            <div className="label">
              Next
              <span className="arrow-right" />
            </div>
          </Link>
        </div>
      );
    }

    if (pagination.pages) {
      pagination.pages.forEach((page) => {
        pages.push(
          <NavLink key={page.url} exact to={page.url}>
            {page.number}
          </NavLink>,
        );
      });
    }

    return (
      <div className="pagination">
        {previous}
        {pages}
        {next}
      </div>
    );
  }

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
};

Pagination.propTypes = {
  pagination: PropTypes.shape({
    previous: PropTypes.object,
    next: PropTypes.object,
    pages: PropTypes.array,
  }).isRequired,
};

Pagination.defaultProps = {
  pagination: {},
};

export default Pagination;
