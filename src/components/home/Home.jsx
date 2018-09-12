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
                Hi, I’m Johan Li. I work for Bonnier News on an editorial platform used by journalists to publish
                articles on some of the largest Swedish newspapers. Used to work for Paradox Interactive.
              </p>
              <p>
                I’m fascinated by what a complex and fast-moving world we live in. Identifying contrasts also
                interests me. What are they, and why can they sometimes be worlds apart? What are the contrasts in
                the world of software, across industries and across levels of technical literacy?
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
