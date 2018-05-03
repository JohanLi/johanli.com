import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import Entry from './Entry';
import Pagination from './Pagination';
import Archive from './Archive';
import Loading from '../../../src/components/Loading';

import blogStore from '../../stores/blog';
import './blog.scss';

const blogPageRequested = pageOrUrlKey => /^[0-9]+$/.test(pageOrUrlKey);

const Blog = observer(class Blog extends React.Component {
  componentDidMount() {
    const { pageOrUrlKey } = this.props;
    blogStore.get(pageOrUrlKey);
  }

  render() {
    const { pageOrUrlKey } = this.props;
    const blog = blogStore.blog || this.props.blog;

    if (blogStore.isLoading(pageOrUrlKey)) {
      return (
        <main id="blog">
          <Loading />
        </main>
      );
    }

    const entries = blog.entries.map(
      entry => (<Entry key={entry.url} entry={entry} />),
    );

    let title;
    if (blogPageRequested(pageOrUrlKey)) {
      title = 'Blog - Johan Li';
    } else {
      title = `${blog.entries[0].title} - Johan Li`;
    }

    return (
      <DocumentTitle title={title}>
        <main className="blog">
          {entries}
          <Pagination
            pageOrUrlKey={pageOrUrlKey}
            totalPages={blog.totalPages}
          />
          <Archive archive={blog.archive.slice()} />
        </main>
      </DocumentTitle>
    );
  }
});

Blog.propTypes = {
  blog: PropTypes.shape({
    entries: PropTypes.array,
    totalPages: PropTypes.number,
    archive: PropTypes.array,
  }),
  pageOrUrlKey: PropTypes.string,
};

Blog.defaultProps = {
  blog: {
    entries: [],
    totalPages: 0,
    archive: [],
  },
  pageOrUrlKey: '1',
};

export default Blog;
