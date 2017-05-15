import React from 'react';
import PropTypes from 'prop-types';

import Entry from './Entry';
import Archive from './Archive';

import zoom from '../../js/zoom';

class Blog extends React.Component {

  constructor(props) {
    super(props);

    this.entries = [];
    this.archive = [];

    props.blogEntries.entries.forEach((entry) => {
      this.entries.push(<Entry key={entry.id} entry={entry} />);
    });

    props.blogEntries.archive.forEach((year) => {
      this.archive.push(<Archive key={year.year} year={year} />);
    });
  }

  componentDidMount() {
    zoom(window, document);
  }

  render() {
    return (
      <main id="blog">
        {this.entries}
        <div className="archive">
          {this.archive}
        </div>
      </main>
    );
  }
}

Blog.propTypes = {
  blogEntries: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ])).isRequired,
};

export default Blog;
