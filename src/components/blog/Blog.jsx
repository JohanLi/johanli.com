import React from 'react';
import PropTypes from 'prop-types';

import Entry from './Entry';
import Archive from './Archive';

const Blog = (props) => {
  const entries = [];
  const archive = [];

  props.blogEntries.entries.forEach((entry) => {
    entries.push(<Entry key={entry.id} entry={entry} />);
  });

  props.blogEntries.archive.forEach((year) => {
    archive.push(<Archive key={year.year} year={year} />);
  });

  return (
    <main id="blog">
      {entries}
      <div className="archive">
        {archive}
      </div>
    </main>
  );
};

Blog.propTypes = {
  blogEntries: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ])).isRequired,
};

export default Blog;
