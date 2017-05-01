import React from 'react';
import PropTypes from 'prop-types';

const Links = ({ project }) => {
  let links;
  let blogEntries;

  if (project.homepage_url || project.github_url) {
    links = (
      <div>
        <h3>Links</h3>
        <ul>
          <li>
            <a href={project.homepage_url}>Homepage</a>
          </li>
          <li>
            <a href={project.github_url}>GitHub</a>
          </li>
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
  project: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Links;
