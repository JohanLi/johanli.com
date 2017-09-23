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
      blog: store.getBlog() || props.blog,
      sideProjects: store.getSideProjects() || props.sideProjects,
    };
  }

  async componentDidMount() {
    this.setState({
      blog: await store.updateBlog(1),
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
          render={() => <Home blog={this.state.blog} />}
        />
        <Route
          path="/blog/:pageOrUrlKey?"
          render={({ match }) => (
            <Blog
              key={match.params.pageOrUrlKey}
              blog={this.state.blog}
              archive={this.props.archive}
              pageOrUrlKey={match.params.pageOrUrlKey}
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
  blog: PropTypes.shape({
    entries: PropTypes.object,
    pages: PropTypes.object,
    pagination: PropTypes.object,
  }),
  archive: PropTypes.arrayOf(PropTypes.object),
  sideProjects: PropTypes.arrayOf(PropTypes.object),
};

App.defaultProps = {
  blog: {
    entries: {},
    pages: {},
    pagination: {},
  },
  archive: [],
  sideProjects: [],
};

export default App;
