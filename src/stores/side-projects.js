import { decorate, observable, action } from 'mobx';
import appInitialState from './helpers/app-initial-state';
import request from './helpers/request';

const sideProjects = {
  projects: appInitialState.get('sideProjects') || [],

  getProjects: async () => {
    sideProjects.projects = await request('/api/side-projects');
  },
};

decorate(sideProjects, {
  projects: observable,
  getProjects: action,
});

export default sideProjects;
