import React from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import Home from './home/Home';
import Blog from './blog/Blog';
import SideProjects from './sideProjects/SideProjects';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

import styles from './app.scss';

const App = ({ latestBlogEntries, blog, sideProjects }) => (
  <div className={styles.app}>
    <Header />
    <Route
      exact
      path="/"
      render={() => (
        <Home
          latestBlogEntries={latestBlogEntries}
        />
      )}
    />
    <Route
      path="/blog/:pageOrUrlKey?"
      render={({ match }) => (
        <Blog
          key={match.params.pageOrUrlKey}
          blog={blog}
          pageOrUrlKey={match.params.pageOrUrlKey}
        />
      )}
    />
    <Route
      path="/side-projects"
      render={() => (
        <SideProjects
          projects={sideProjects}
        />
      )}
    />
    <Footer />
    <ScrollToTop />
  </div>
);

App.propTypes = {};

export default App;
