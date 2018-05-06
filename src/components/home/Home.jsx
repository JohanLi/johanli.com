import React from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import LatestBlogEntries from './LatestBlogEntries';
import home from '../../stores/home';
import styles from './home.scss';

import personalPortrait from '../../../public/img/johan.jpg';

const Home = withRouter(observer(class Home extends React.Component {
  componentDidMount() {
    home.getLatestBlogEntries();
  }

  render() {
    const latestBlogEntries = home.latestBlogEntries || this.props.latestBlogEntries;

    const entries = latestBlogEntries.map(
      entry => (<LatestBlogEntries key={entry.url} entry={entry} />),
    );

    return (
      <DocumentTitle title="Johan Li - Web Developer">
        <div className={styles.wrapper}>
          <div className={styles.banner} />
          <main className={styles.home}>
            <div className={`${styles.aboutMe} clearfix`}>
              <div className={styles.imageContainer}>
                <div style={{ paddingBottom: '100%' }}>
                  <img src={personalPortrait} alt="Johan Li" />
                </div>
              </div>
              <p>
                Hi, I’m Johan Li. I work at <a href="https://en.wikipedia.org/wiki/Paradox_Interactive">Paradox Interactive</a> as
                a web developer, building our e-commerce platform and online services.
              </p>
              <p>
                What fascinates me is how complex and fast-moving of a world we live
                in, not least in the tech industry. It’s interesting to reflect over
                how tech has changed society, as well as predict what will happen in
                the future.
              </p>
            </div>
            <div className={styles.latestBlog}>
              <h2>Latest Blog Entries</h2>
              {entries}
            </div>
          </main>
        </div>
      </DocumentTitle>
    );
  }
}));

Home.propTypes = {
  latestBlogEntries: PropTypes.array.isRequired,
};

export default Home;
