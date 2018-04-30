import { decorate, observable, action } from 'mobx';
import { request } from './helpers';

const sideProjects = {
  projects: [],

  getProjects: async () => {
    sideProjects.projects = await request('/api/side-projects');
  },
};

decorate(sideProjects, {
  projects: observable,
  getProjects: action,
});

export default sideProjects;
