import React from 'react';
import PropTypes from 'prop-types';

const Latest = ({ entry }) => (
  <a className="entry" href={`/blog/${entry.url}`}>
    <div className="title">
      {entry.title}
    </div>
    <div className="excerpt">
      {entry.excerpt}
    </div>
  </a>
);

Latest.propTypes = {
  entry: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ])).isRequired,
};

export default Latest;
