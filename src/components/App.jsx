import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Store from '../store';

import Header from './Header';
import Banner from './home/Banner';
import Home from './home/Home';
import Blog from './blog/Blog';
import SideProjects from './sideProjects/SideProjects';
import Footer from './Footer';

import '../styles/index.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latestBlogEntries: Store.get('latestBlogEntries') || [],
      blogEntries: Store.get('blogEntries') || {
        entries: [],
        pagination: [],
        archive: [],
      },
      sideProjects: Store.get('sideProjects') || [],
    };
  }

  async componentWillMount() {
    this.setState({
      latestBlogEntries: await Store.update('latestBlogEntries'),
      blogEntries: await Store.update('blogEntries'),
      sideProjects: await Store.update('sideProjects'),
    });
  }

  render() {
    return (
      <Router>
        <div id="app">
          <Header />
          <Route exact path="/" component={Banner} />
          <Route
            exact
            path="/"
            render={() => <Home latestBlogEntries={this.state.latestBlogEntries} />}
          />
          <Route
            path="/blog"
            render={() => <Blog blogEntries={this.state.blogEntries} />}
          />
          <Route
            path="/side-projects"
            render={() => <SideProjects projects={this.state.sideProjects} />}
          />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
