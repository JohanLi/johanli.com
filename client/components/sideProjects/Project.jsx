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
    <a className="image-container" href={project.homepage_url}>
      <div style={{ paddingBottom: '50%' }}>
        <img src={project.image_url} alt={project.name} />
      </div>
    </a>
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
