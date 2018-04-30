import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import Entry from './Entry';
import Pagination from './Pagination';
import Archive from './Archive';
import Loading from '../../../src/components/Loading';

import blog from "../../stores/blog";
import './blog.scss';

const blogPageRequested = pageOrUrlKey => /^[0-9]+$/.test(pageOrUrlKey);

const Blog = observer(class Blog extends React.Component {
  componentDidMount() {
    const { pageOrUrlKey } = this.props;

    if (blogPageRequested(pageOrUrlKey)) {
      blog.getPage(pageOrUrlKey);
    } else {
      blog.getUrlKey(pageOrUrlKey);
    }

    blog.getArchive();
  }

  render () {
    const { pageOrUrlKey } = this.props;

    let title;
    let entries = [];

    if (blogPageRequested(pageOrUrlKey)) {
      title = 'Blog - Johan Li';
      entries = blog.pages.get(pageOrUrlKey) || [];
      entries = entries.map(
        entryUrl => (<Entry key={entryUrl} entry={blog.entries.get(entryUrl)} />),
      );
    } else {
      const entry = blog.entries.get(pageOrUrlKey);

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

    return (
      <DocumentTitle title={title}>
        <main className="blog">
          {entries}
          <Pagination
            pageOrUrlKey={pageOrUrlKey}
            totalPages={blog.totalPages}
          />
          <Archive archive={blog.archive} />
        </main>
      </DocumentTitle>
    );
  }
});

Blog.propTypes = {
  pageOrUrlKey: PropTypes.string,
};

Blog.defaultProps = {
  pageOrUrlKey: '1',
};

export default Blog;
