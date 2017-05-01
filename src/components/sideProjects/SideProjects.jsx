import React from 'react';
import PropTypes from 'prop-types';

import Project from './Project';

const SideProjects = (props) => {
  const projects = [];

  props.projects.forEach((project) => {
    projects.push(<Project key={project.id} project={project} />);
  });

  return (
    <main id="side-projects">
      {projects}
    </main>
  );
};

SideProjects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SideProjects;
