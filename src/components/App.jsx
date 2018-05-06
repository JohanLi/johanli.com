import React from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import Home from './home/Home';
import Blog from './blog/Blog';
import SideProjects from './sideProjects/SideProjects';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

import styles from './app.scss';
import PropTypes from "prop-types";

const App = ({ home, blog, sideProjects }) => (
  <div className={styles.app}>
    <Header />
    <Route
      exact
      path="/"
      render={() => (
        <Home
          latestBlogEntries={home.latestBlogEntries}
        />
      )}
    />
    <Route
      path="/blog/:pageOrUrlKey?"
      render={({ match }) => (
        <Blog
          key={match.params.pageOrUrlKey}
          blog={blog.blog}
          pageOrUrlKey={match.params.pageOrUrlKey}
        />
      )}
    />
    <Route
      path="/side-projects"
      render={() => (
        <SideProjects
          projects={sideProjects.projects}
        />
      )}
    />
    <Footer />
    <ScrollToTop />
  </div>
);

App.propTypes = {
  home: PropTypes.shape({
    latestBlogEntries: PropTypes.array,
  }),
  blog: PropTypes.shape({
    blog: PropTypes.shape({
      entries: PropTypes.array,
      totalPages: PropTypes.number,
      archive: PropTypes.array,
    }),
  }),
  sideProjects: PropTypes.shape({
    projects: PropTypes.array,
  }),
};

App.defaultProps = {
  home: {
    latestBlogEntries: [],
  },
  blog: {
    blog: {
      entries: [],
      totalPages: 0,
      archive: [],
    },
  },
  sideProjects: {
    projects: [],
  },
};

export default App;
