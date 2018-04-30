import React from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import Home from './home/Home';
import Blog from './blog/Blog';
import SideProjects from './sideProjects/SideProjects';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

import styles from './app.scss';

const App = () => (
  <div className={styles.app}>
    <Header />
    <Route
      exact
      path="/"
      render={Home}
    />
    <Route
      path="/blog/:pageOrUrlKey?"
      render={({ match }) => (
        <Blog
          key={match.params.pageOrUrlKey}
          pageOrUrlKey={match.params.pageOrUrlKey}
        />
      )}
    />
    <Route
      path="/side-projects"
      render={SideProjects}
    />
    <Footer />
    <ScrollToTop />
  </div>
);

App.propTypes = {};

export default App;
