import React from 'react';
import PropTypes from 'prop-types';
import Store from '../../store';

import Entry from './Entry';
import Pagination from './Pagination';
import Archive from './Archive';

import zoom from '../../js/zoom';

class Blog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      blogEntries: Store.get(`/api/blog/${this.props.pageOrUrlKey}`) || {
        entries: [],
        pagination: {},
        archive: [],
      },
    };
  }

  async componentWillMount() {
    this.setState({
      blogEntries: await Store.update(`/api/blog/${this.props.pageOrUrlKey}`),
    });
  }

  async componentDidMount() {
    zoom(window, document);
  }

  render() {
    const entries = [];
    const archive = [];
    let pagination = '';

    this.state.blogEntries.entries.forEach((entry) => {
      entries.push(<Entry key={entry.id} entry={entry} />);
    });

    this.state.blogEntries.archive.forEach((year) => {
      archive.push(<Archive key={year.year} year={year} />);
    });

    if (!isNaN(this.props.pageOrUrlKey)) {
      pagination = <Pagination pagination={this.state.blogEntries.pagination} />;
    } else {
      pagination = <Pagination singlePagination={this.state.blogEntries.pagination} />;
    }

    return (
      <main id="blog">
        {entries}
        {pagination}
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
