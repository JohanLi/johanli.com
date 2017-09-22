import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import store from '../store';

import Header from './Header';
import Home from './home/Home';
import Blog from './blog/Blog';
import SideProjects from './sideProjects/SideProjects';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

import '../styles/index.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latestBlogEntries: props.latestBlogEntries,
      blogPage: props.blogPage,
      blogArchive: props.blogArchive,
      sideProjects: props.sideProjects,
    };
  }

  async componentDidMount() {
    if (this.state.latestBlogEntries.length
      && this.state.blogArchive.length
      && this.state.sideProjects.length) {
      return;
    }

    this.setState({
      latestBlogEntries: await store.updateLatestBlogEntries(),
      blogArchive: await store.updateBlogArchive(),
      sideProjects: await store.updateSideProjects(),
    });
  }

  render() {
    return (
      <div id="app">
        <Header />
        <Route
          exact
          path="/"
          render={() => <Home latestBlogEntries={this.state.latestBlogEntries} />}
        />
        <Route
          path="/blog/:pageOrUrlKey?"
          render={({ match }) => (
            <Blog
              key={match.params.pageOrUrlKey}
              pageOrUrlKey={match.params.pageOrUrlKey}
              page={this.state.blogPage}
              archive={this.state.blogArchive}
            />
          )}
        />
        <Route
          path="/side-projects"
          render={() => <SideProjects projects={this.state.sideProjects} />}
        />
        <Footer />
        <ScrollToTop />
      </div>
    );
  }
}

App.propTypes = {
  latestBlogEntries: PropTypes.arrayOf(PropTypes.object).isRequired,
  blogPage: PropTypes.shape({
    entries: PropTypes.array,
    pagination: PropTypes.object,
  }).isRequired,
  blogArchive: PropTypes.arrayOf(PropTypes.object).isRequired,
  sideProjects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

App.defaultProps = {
  latestBlogEntries: [],
  blogPage: {
    entries: [],
    pagination: {},
  },
  blogArchive: [],
  sideProjects: [],
};

export default App;
