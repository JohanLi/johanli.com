import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Latest = ({ entry }) => (
  <Link className="entry" to={`/blog/${entry.url}`}>
    <div className="title">
      {entry.title}
    </div>
    <div className="excerpt">
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
