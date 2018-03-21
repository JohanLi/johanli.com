import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import store from '../store';

import Header from '../../src/components/Header';
import Home from './home/Home';
import Blog from './blog/Blog';
import SideProjects from '../../src/components/sideProjects/SideProjects';
import Footer from '../../src/components/Footer';
import ScrollToTop from '../../src/components/ScrollToTop';

import '../styles/index.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blog: store.getBlog() || props.blog,
      sideProjects: store.getSideProjects() || props.sideProjects,
    };
  }

  async updateBlog(pageOrUrlKey) {
    this.setState({
      blog: await store.updateBlog(pageOrUrlKey),
    });
  }

  async updateSideProjects() {
    this.setState({
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
          render={() => (
            <Home
              blog={this.state.blog}
              update={pageOrUrlKey => this.updateBlog(pageOrUrlKey)}
            />
          )}
        />
        <Route
          path="/blog/:pageOrUrlKey?"
          render={({ match }) => (
            <Blog
              key={match.params.pageOrUrlKey}
              pageOrUrlKey={match.params.pageOrUrlKey}
              blog={this.state.blog}
              update={pageOrUrlKey => this.updateBlog(pageOrUrlKey)}
            />
          )}
        />
        <Route
          path="/side-projects"
          render={() => (
            <SideProjects
              projects={this.state.sideProjects}
              update={() => this.updateSideProjects()}
            />
          )}
        />
        <Footer />
        <ScrollToTop />
      </div>
    );
  }
}

App.propTypes = {
  blog: PropTypes.shape({
    entries: PropTypes.object,
    pages: PropTypes.object,
    archive: PropTypes.array,
    totalPages: PropTypes.number,
  }),
  sideProjects: PropTypes.arrayOf(PropTypes.object),
};

App.defaultProps = {
  blog: {
    entries: {},
    pages: {},
    archive: [],
    totalPages: 0,
  },
  sideProjects: [],
};

export default App;
