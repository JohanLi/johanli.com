import React from 'react';
import { observer } from 'mobx-react';
import { Route, withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import Project from './Project';
import PokemonGo from './PokemonGo';

import sideProjects from '../../stores/side-projects';
import styles from './sideProjects.scss';

const SideProjects = withRouter(observer(class SideProjects extends React.Component {
  componentDidMount() {
    sideProjects.getProjects();
  }

  render() {
    const projects = sideProjects.projects.map(
      project => <Project key={project.id} project={project}/>
    );

    return (
      <DocumentTitle title="Side Projects - Johan Li">
        <main className={styles.sideProjects}>
          <Route
            exact
            path="/side-projects"
            render={() => (
              <>
                {projects}
              </>
            )}
          />
          <Route exact path="/side-projects/pokemon-go" component={PokemonGo}/>
        </main>
      </DocumentTitle>
    );
  }
}));

SideProjects.propTypes = {};

export default SideProjects;
