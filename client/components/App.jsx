import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from '../store';

import Header from './Header';
import Banner from './home/Banner';
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
      header: {
        active: false,
        transition: true,
      },
      blog: props.blog,
      sideProjects: props.sideProjects,
    };
  }

  async componentDidMount() {
    this.setState({
      blog: {
        entries: await store.updateBlog(1),
        archive: await store.updateBlogArchive(),
      },
      sideProjects: await store.updateSideProjects(),
    });
  }

  headerToggle(event) {
    if (event.key && event.key !== 'Enter') {
      return;
    }

    if (event.type === 'click') {
      event.target.blur();
    }

    this.setState({
      header: {
        active: !this.state.header.active,
        transition: true,
      },
    });
  }

  headerNavigate() {
    this.setState({
      header: {
        active: false,
        transition: false,
      },
    });
  }

  render() {
    const latestBlogEntries = this.state.blog.entries.entries.slice(0, 3);

    return (
      <div id="app">
        <Header
          state={this.state.header}
          toggle={event => this.headerToggle(event)}
          navigate={() => this.headerNavigate()}
        />
        <Route exact path="/" component={Banner} />
        <Route
          exact
          path="/"
          render={() => <Home latestBlogEntries={latestBlogEntries} />}
        />
        <Route
          path="/blog/:pageOrUrlKey?"
          render={({ match }) => (
            <Blog
              key={match.params.pageOrUrlKey}
              pageOrUrlKey={match.params.pageOrUrlKey}
              blog={this.state.blog}
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
    archive: PropTypes.array,
  }).isRequired,
  sideProjects: PropTypes.array.isRequired,
};

App.defaultProps = {
  blog: {
    entries: {
      entries: [],
      pagination: {},
    },
    archive: [],
  },
  sideProjects: [],
};

export default App;
