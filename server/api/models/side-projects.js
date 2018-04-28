import database from '../../database';

export default {
  projects: async () => {
    const [rows] = await database.query(`
      SELECT id, name, description, homepage_url, github_url, image_url, state
      FROM side_projects
      ORDER BY state DESC, id DESC
    `);
    return rows;
  },

  blogEntries: async () => {
    const [rows] = await database.query(`
      SELECT side_project_id, url, title
      FROM blog
      WHERE side_project_id > 0
      ORDER BY published ASC
    `);
    return rows;
  },
};
