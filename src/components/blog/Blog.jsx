import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import Entry from './Entry';
import Pagination from './Pagination';
import Archive from './Archive';
import Loading from '../../../src/components/Loading';

import zoom from '../../../client/js/zoom';
import './blog.scss';

class Blog extends React.Component {
  componentDidMount() {
    this.props.update(this.props.pageOrUrlKey);
    zoom(window, document);
  }

  componentDidUpdate() {
    zoom(window, document);
  }

  render() {
    const blogPageRequested = /^[0-9]+$/.test(this.props.pageOrUrlKey);
    let title;
    let entries = [];

    if (blogPageRequested) {
      title = 'Blog - Johan Li';
      entries = this.props.blog.pages[this.props.pageOrUrlKey] || [];
      entries = entries.map(
        entryUrl => (<Entry key={entryUrl} entry={this.props.blog.entries[entryUrl]} />),
      );
    } else {
      const entry = this.props.blog.entries[this.props.pageOrUrlKey];

      if (entry) {
        title = `${entry.title} - Johan Li`;
        entries = [
          <Entry key={entry.url} entry={entry} />,
        ];
      }
    }

    if (entries.length === 0) {
      return (
        <main id="blog">
          <Loading />
        </main>
      );
    }

    const archive = this.props.blog.archive.map(
      year => <Archive key={year.year} year={year} />,
    );

    return (
      <DocumentTitle title={title}>
        <main id="blog">
          {entries}
          <Pagination
            pageOrUrlKey={this.props.pageOrUrlKey}
            totalPages={this.props.blog.totalPages}
          />
          <div className="archive">
            {archive}
          </div>,
        </main>
      </DocumentTitle>
    );
  }
}

Blog.propTypes = {
  blog: PropTypes.shape({
    entries: PropTypes.object,
    pages: PropTypes.object,
    archive: PropTypes.array,
    totalPages: PropTypes.number,
  }).isRequired,
  update: PropTypes.func.isRequired,
  pageOrUrlKey: PropTypes.string,
};

Blog.defaultProps = {
  pageOrUrlKey: '1',
};

export default Blog;
