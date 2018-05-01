import React from 'react';
import { observer } from 'mobx-react';
import { Route, withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import Project from './Project';
import PokemonGo from './PokemonGo';

import sideProjects from '../../stores/side-projects';
import styles from './sideProjects.scss';
import PropTypes from "prop-types";

const SideProjects = withRouter(observer(class SideProjects extends React.Component {
  componentDidMount() {
    sideProjects.getProjects();
  }

  render() {
    const projects = sideProjects.projects || this.props.projects;

    return (
      <DocumentTitle title="Side Projects - Johan Li">
        <main className={styles.sideProjects}>
          <Route
            exact
            path="/side-projects"
            render={() => (
              <>
                {projects.map(project => <Project key={project.id} project={project} />)}
              </>
            )}
          />
          <Route exact path="/side-projects/pokemon-go" component={PokemonGo}/>
        </main>
      </DocumentTitle>
    );
  }
}));

SideProjects.propTypes = {
  projects: PropTypes.array,
};

SideProjects.defaultProps = {
  projects: [],
};

export default SideProjects;
