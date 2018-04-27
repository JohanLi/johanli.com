import sideProjects from '../models/side-projects';

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

export default {
  async get(req, res) {
    const [projects] = await sideProjects.projects();
    const [blogEntries] = await sideProjects.blogEntries();

    res.json(joinBlogEntries(projects, blogEntries));
  },
};
