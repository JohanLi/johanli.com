import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import Project from './Project';
import PokemonGo from './PokemonGo';

const SideProjects = (props) => {
  const projects = [];

  props.projects.forEach((project) => {
    projects.push(<Project key={project.id} project={project} />);
  });

  return (
    <DocumentTitle title="Side Projects - Johan Li">
      <main id="side-projects">
        <Route
          exact
          path="/side-projects"
          render={() => (
            <div>
              {projects}
            </div>
          )}
        />
        <Route exact path="/side-projects/pokemon-go" component={PokemonGo} />
      </main>
    </DocumentTitle>
  );
};

SideProjects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SideProjects;
