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
      blog: store.getBlogPage(this.props.pageOrUrlKey) || props.blog,
      sideProjects: store.getSideProjects() || props.sideProjects,
    };
  }

  async componentDidMount() {
    if (this.state.blog.pages[1]
      && this.state.sideProjects.length) {
      return;
    }

    this.setState({
      blog: await store.updateBlogPage(1),
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
    archive: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  sideProjects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

App.defaultProps = {
  blog: {
    entries: {},
    pages: {},
    archive: [],
  },
  sideProjects: [],
};

export default App;
