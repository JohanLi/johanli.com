import React from 'react';
import PropTypes from 'prop-types';
import store from '../../store';

import Entry from './Entry';
import Pagination from './Pagination';
import Archive from './Archive';

import zoom from '../../js/zoom';

class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blogPage: this.props.blogPage,
    };
  }

  async componentDidMount() {
    this.setState({
      blogPage: {
        entries: await store.updateBlogPage(this.props.pageOrUrlKey),
        archive: await store.updateBlogArchive(),
      },
    });

    zoom(window, document);
  }

  render() {
    const entries = [];
    const archive = [];

    this.state.blogPage.entries.entries.forEach((entry) => {
      entries.push(<Entry key={entry.id} entry={entry} />);
    });

    this.state.blogPage.archive.forEach((year) => {
      archive.push(<Archive key={year.year} year={year} />);
    });

    return (
      <main id="blog">
        {entries}
        <Pagination pagination={this.state.blogPage.entries.pagination} />
        <div className="archive">
          {archive}
        </div>
      </main>
    );
  }
}

Blog.propTypes = {
  pageOrUrlKey: PropTypes.string.isRequired,
  blogPage: PropTypes.shape({
    entries: PropTypes.object,
    archive: PropTypes.array,
  }).isRequired,
};

Blog.defaultProps = {
  pageOrUrlKey: '1',
  blogPage: {
    entries: {
      entries: [],
      pagination: {},
    },
    archive: [],
  },
};

export default Blog;
