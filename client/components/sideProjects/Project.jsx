import React from 'react';
import PropTypes from 'prop-types';

import Status from './Status';
import Links from './Links';

const Project = ({ project }) => (
  <div className="project">
    <div className="content">
      <div className="title">
        <h2>{project.name}</h2>
        <div className="status-container">
          <Status key={project.id} state={project.state} />
        </div>
      </div>
      <div className="description">
        {project.description}
      </div>
    </div>
    <div className="image">
      <a href={project.homepage_url}>
        <img src={project.image_url} width="600" height="600" alt={project.name} />
      </a>
    </div>
    <Links key={project.id} project={project} />
  </div>
);

Project.propTypes = {
  project: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
  ])).isRequired,
};

export default Project;
