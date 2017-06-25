import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

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

  if (project.blogEntries) {
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
    <div className="links">
      {links}
      {blogEntries}
    </div>
  );
};

Links.propTypes = {
  project: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
  ])).isRequired,
};

export default Links;
