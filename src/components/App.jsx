import React from 'react';
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
      blogEntries: store.getBlog(1),
      sideProjects: store.getSideProjects(),
    };
  }

  async componentWillMount() {
    this.setState({
      blogEntries: await store.updateBlog(1),
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
    let latestBlogEntries = [];

    if (this.state.blogEntries.entries) {
      latestBlogEntries = this.state.blogEntries.entries;
    }

    return (
      <Router>
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
      </Router>
    );
  }
}

export default App;
