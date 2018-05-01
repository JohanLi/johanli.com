import database from '../../database';

const joinBlogEntries = (projects, blogEntries) => {
  const groupedBlogEntries = {};

  blogEntries.forEach(({ side_project_id, url, title }) => {
    if (!groupedBlogEntries[side_project_id]) {
      groupedBlogEntries[side_project_id] = [];
    }

    groupedBlogEntries[side_project_id].push({
      url,
      title,
    });
  });

  return projects.map(project => ({
    ...project,
    blogEntries: groupedBlogEntries[project.id] || [],
  }));
};

const sideProjects = {
  get: async () => {
    const projects = await sideProjects.projects();
    const blogEntries = await sideProjects.blogEntries();

    return joinBlogEntries(projects, blogEntries);
  },

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

export default sideProjects;
