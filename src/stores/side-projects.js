import { decorate, observable, action } from 'mobx';
import request from './helpers/request';

const sideProjects = {
  projects: null,

  getProjects: async () => {
    sideProjects.projects = await request('/api/side-projects');
  },
};

decorate(sideProjects, {
  projects: observable,
  getProjects: action,
});

export default sideProjects;
