import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PropTypes as MPropTypes } from 'mobx-react';

import styles from './links.scss';

const isInternal = url => url[0] === '/';

const Links = ({ project }) => {
  let links;
  let blogEntries;

  if (project.homepage_url || project.github_url) {
    let homepageLink;
    let githubLink;

    if (project.homepage_url) {
      if (isInternal(project.homepage_url)) {
        homepageLink = <li><Link to={project.homepage_url}>Homepage</Link></li>;
      } else {
        homepageLink = <li><a href={project.homepage_url}>Homepage</a></li>;
      }
    }

    if (project.github_url) {
      githubLink = <li><a href={project.github_url}>GitHub</a></li>;
    }

    links = (
      <div>
        <h3>Links</h3>
        <ul>
          {homepageLink}
          {githubLink}
        </ul>
      </div>
    );
  }

  if (project.blogEntries.length) {
    const entries = [];

    project.blogEntries.forEach((entry) => {
      entries.push(
        <li key={entry.url}>
          <a href={`/blog/${entry.url}`}>{entry.title}</a>
        </li>,
      );
    });

    blogEntries = (
      <div>
        <h3>Blog Entries</h3>
        <ul>
          {entries}
        </ul>
      </div>
    );
  }

  return (
    <div className={styles.links}>
      {links}
      {blogEntries}
    </div>
  );
};

Links.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    homepage_url: PropTypes.string.isRequired,
    github_url: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    state: PropTypes.number.isRequired,
    blogEntries: MPropTypes.observableArray.isRequired,
  }).isRequired,
};

export default Links;
