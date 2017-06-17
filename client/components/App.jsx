import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
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
      latestBlogEntries: props.latestBlogEntries,
      blogPage: props.blogPage,
      sideProjects: props.sideProjects,
    };
  }

  async componentDidMount() {
    if (this.state.latestBlogEntries.length
      && this.state.sideProjects.length) {
      return;
    }

    this.setState({
      latestBlogEntries: await store.updateLatestBlogEntries(),
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
          render={() => <Home latestBlogEntries={this.state.latestBlogEntries} />}
        />
        <Route
          path="/blog/:pageOrUrlKey?"
          render={({ match }) => (
            <Blog
              key={match.params.pageOrUrlKey}
              pageOrUrlKey={match.params.pageOrUrlKey}
              blogPage={this.state.blogPage}
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
    entries: PropTypes.object,
    archive: PropTypes.array,
  }).isRequired,
  sideProjects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

App.defaultProps = {
  latestBlogEntries: [],
  blogPage: {
    entries: {
      entries: [],
      pagination: {},
    },
    archive: [],
  },
  sideProjects: [],
};

export default App;
