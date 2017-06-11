import React from 'react';
import PropTypes from 'prop-types';

import Entry from './Entry';
import Pagination from './Pagination';
import Archive from './Archive';

import zoom from '../../js/zoom';

class Blog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      entries: props.entries,
      archive: props.archive,
    };
  }

  async componentDidMount() {
    zoom(window, document);
  }

  render() {
    const entries = [];
    const archive = [];

    this.state.entries.entries.forEach((entry) => {
      entries.push(<Entry key={entry.id} entry={entry} />);
    });

    this.state.archive.forEach((year) => {
      archive.push(<Archive key={year.year} year={year} />);
    });

    return (
      <main id="blog">
        {entries}
        <Pagination pagination={this.state.entries.pagination} />
        <div className="archive">
          {archive}
        </div>
      </main>
    );
  }
}

Blog.propTypes = {
  pageOrUrlKey: PropTypes.string.isRequired,
};

Blog.defaultProps = {
  pageOrUrlKey: '1',
};

export default Blog;
