import database from '../../database';

export default {
  projects: () =>
    database.query('SELECT * FROM side_projects ORDER BY state DESC, id DESC'),

  blogEntries: () =>
    database.query('SELECT side_project_id, url, title FROM blog WHERE side_project_id > 0 ORDER BY published ASC'),
};
