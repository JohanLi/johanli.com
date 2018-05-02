import React from 'react';
import { observer, PropTypes as MPropTypes } from 'mobx-react';
import PropTypes from 'prop-types';

import Status from './Status';
import Links from './Links';

import styles from './project.scss';

const Project = observer(({ project }) => (
  <div className={styles.project}>
    <div className={styles.content}>
      <div className={styles.title}>
        <h2>{project.name}</h2>
        <div className={styles.statusContainer}>
          <Status key={project.id} state={project.state} />
        </div>
      </div>
      <div className={styles.description}>
        {project.description}
      </div>
    </div>
    <a className={styles.imageContainer} href={project.homepage_url}>
      <div style={{ paddingBottom: '50%' }}>
        <img src={project.image_url} alt={project.name} />
      </div>
    </a>
    <Links key={project.id} project={project} />
  </div>
));

Project.propTypes = {
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

export default Project;
