import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import Project from './Project';
import PokemonGo from './PokemonGo';
import styles from './sideProjects.scss';

class SideProjects extends React.Component {
  componentDidMount() {
    this.props.update();
  }

  render() {
    const projects = this.props.projects.map(
      project => <Project key={project.id} project={project} />,
    );

    return (
      <DocumentTitle title="Side Projects - Johan Li">
        <main className={styles['side-projects']}>
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
  }
}

SideProjects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  update: PropTypes.func.isRequired,
};

export default SideProjects;
