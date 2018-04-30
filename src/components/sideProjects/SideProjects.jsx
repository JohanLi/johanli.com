import React from 'react';
import { observer } from 'mobx-react';
import { Route, withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import Project from './Project';
import PokemonGo from './PokemonGo';

import store from '../../store';
import styles from './sideProjects.scss';

const SideProjects = withRouter(observer(class SideProjects extends React.Component {
  componentDidMount() {
    store.updateSideProjects();
  }

  render() {
    const { sideProjects } = store;

    return (
      <DocumentTitle title="Side Projects - Johan Li">
        <main className={styles.sideProjects}>
          <Route
            exact
            path="/side-projects"
            render={() => (
              <>
                {sideProjects.map(project => <Project key={project.id} project={project}/>)}
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
