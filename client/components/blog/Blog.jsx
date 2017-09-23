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

    this.state = {
      blog: store.getBlog() || props.blog,
      archive: store.getBlogArchive() || props.archive,
    };
  }

  async componentDidMount() {
    this.setState({
      blog: await store.updateBlog(this.props.pageOrUrlKey),
      archive: await store.updateBlogArchive(),
    });

    zoom(window, document);
  }

  render() {
    let title = 'Blog - Johan Li';

    let entries;

    const blogPageRequested = !isNaN(this.props.pageOrUrlKey);

    if (blogPageRequested) {
      const pageEntries = this.state.blog.pages[this.props.pageOrUrlKey] || [];

      entries = pageEntries.map(
        entryUrl => (<Entry key={entryUrl} entry={this.state.blog.entries[entryUrl]} />),
      );
    } else if (this.state.blog.entries[this.props.pageOrUrlKey]) {
      title = `${this.state.blog.entries[this.props.pageOrUrlKey].title} - Johan Li`;
      entries = (
        <Entry
          key={this.state.blog.entries[this.props.pageOrUrlKey].url}
          entry={this.state.blog.entries[this.props.pageOrUrlKey]}
        />
      );
    }

    const archive = this.state.archive.map(
      year => <Archive key={year.year} year={year} />,
    );

    return (
      <DocumentTitle title={title}>
        <main id="blog">
          {entries}
          <Pagination pagination={this.state.blog.pagination} />
          <div className="archive">
            {archive}
          </div>
        </main>
      </DocumentTitle>
    );
  }
}

Blog.propTypes = {
  blog: PropTypes.shape({
    entries: PropTypes.object,
    pages: PropTypes.object,
  }).isRequired,
  archive: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageOrUrlKey: PropTypes.string,

};

Blog.defaultProps = {
  pageOrUrlKey: '1',
};

export default Blog;
