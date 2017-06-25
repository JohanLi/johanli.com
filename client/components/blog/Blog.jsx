import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import store from '../../store';

import Entry from './Entry';
import Pagination from './Pagination';
import Archive from './Archive';

import zoom from '../../js/zoom';

class Blog extends React.Component {
  constructor(props) {
    super(props);

    const client = typeof window !== 'undefined';

    this.state = {
      page: (client && store.getBlogPage(this.props.pageOrUrlKey)) || props.page,
      archive: (client && store.getBlogArchive()) || props.archive,
    };
  }

  async componentDidMount() {
    this.setState({
      page: await store.updateBlogPage(this.props.pageOrUrlKey),
      archive: await store.updateBlogArchive(),
    });

    zoom(window, document);
  }

  render() {
    let title = 'Blog - Johan Li';

    if (isNaN(this.props.pageOrUrlKey) && this.state.page.entries.length) {
      title = `${this.state.page.entries[0].title} - Johan Li`;
    }

    const entries = [];
    const archive = [];

    this.state.page.entries.forEach((entry) => {
      entries.push(<Entry key={entry.id} entry={entry} />);
    });

    this.state.archive.forEach((year) => {
      archive.push(<Archive key={year.year} year={year} />);
    });

    return (
      <DocumentTitle title={title}>
        <main id="blog">
          {entries}
          <Pagination pagination={this.state.page.pagination} />
          <div className="archive">
            {archive}
          </div>
        </main>
      </DocumentTitle>
    );
  }
}

Blog.propTypes = {
  pageOrUrlKey: PropTypes.string.isRequired,
  page: PropTypes.shape({
    entries: PropTypes.array,
    pagination: PropTypes.object,
  }).isRequired,
  archive: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Blog.defaultProps = {
  pageOrUrlKey: '1',
  page: {
    entries: [],
    pagination: {},
  },
  archive: [],
};

export default Blog;
