import React from 'react';
import PropTypes from 'prop-types';

import LatestBlogEntries from './LatestBlogEntries';

import personalPortrait from '../../../public/img/johan.jpg';

const Home = ({ latestBlogEntries }) => {
  const entries = [];

  latestBlogEntries.forEach((entry) => {
    entries.push(<LatestBlogEntries key={entry.url} entry={entry} />);
  });

  return (
    <main id="home">
      <div className="about-me clearfix">
        <img src={personalPortrait} width="260" height="260" alt="Johan Li" />
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
      <div className="latest-blog">
        <h2>Latest Blog Entries</h2>
        {entries}
      </div>
    </main>
  );
};

Home.propTypes = {
  latestBlogEntries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Home.defaultProps = {
  latestBlogEntries: [],
};

export default Home;
