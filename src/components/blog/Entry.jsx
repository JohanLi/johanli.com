/* eslint react/no-danger: "off" */

import React from 'react';
import PropTypes from 'prop-types';

const Entry = ({ entry }) => (
  <article>
    <div className="published">
      <span className="month">{entry.published.month}</span>
      <span className="date">{entry.published.date}</span>
      <span className="year">{entry.published.year}</span>
    </div>
    <h2>{entry.title}</h2>
    <div dangerouslySetInnerHTML={{ __html: entry.html }} />
  </article>
);

Entry.propTypes = {
  entry: PropTypes.shape({
    published: PropTypes.object,
    title: PropTypes.string,
    html: PropTypes.string,
  }).isRequired,
};

export default Entry;
