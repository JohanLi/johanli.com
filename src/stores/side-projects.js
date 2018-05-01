import { decorate, observable, action } from 'mobx';
import initialState from './helpers/initial-state';
import request from './helpers/request';

const sideProjects = {
  projects: initialState('sideProjects'),

  getProjects: async () => {
    sideProjects.projects = await request('/api/side-projects');
  },
};

decorate(sideProjects, {
  projects: observable,
  getProjects: action,
});

export default sideProjects;
