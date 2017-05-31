import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Pagination = ({ pagination, singlePagination }) => {
  let previous = '';
  let next = '';
  const pages = [];

  if (pagination) {
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

  if (singlePagination) {
    if (singlePagination.previous) {
      previous = (
        <div className="previous">
          <Link to={singlePagination.previous.url}>
            <div className="label">
              <span className="arrow-left" />
              Previous
            </div>
            <div className="title">
              {singlePagination.previous.title}
            </div>
          </Link>
        </div>
      );
    }

    if (singlePagination.next) {
      next = (
        <div className="next">
          <Link to={singlePagination.next.url}>
            <div className="label">
              Next
              <span className="arrow-right" />
            </div>
            <div className="title">
              {singlePagination.next.title}
            </div>
          </Link>
        </div>
      );
    }

    return (
      <div className="single-pagination">
        {previous}
        {next}
      </div>
    );
  }

  return (null);
};

Pagination.propTypes = {
  pagination: PropTypes.shape({
    previous: PropTypes.object,
    next: PropTypes.object,
    pages: PropTypes.array,
  }),
  singlePagination: PropTypes.shape({
    previous: PropTypes.object,
    next: PropTypes.object,
  }),
};

Pagination.defaultProps = {
  pagination: {},
  singlePagination: {},
};

export default Pagination;
