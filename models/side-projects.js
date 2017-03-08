const database = require('./database');

const joinBlogEntries = (sideProjects, blogEntries) => {
  const groupedBlogEntries = {};

  blogEntries.forEach((entry) => {
    if (!groupedBlogEntries[entry.side_project_id]) {
      groupedBlogEntries[entry.side_project_id] = [];
    }

    groupedBlogEntries[entry.side_project_id].push({
      url: entry.url,
      title: entry.title,
    });
  });

  sideProjects.forEach((project) => {
    project.blogEntries = groupedBlogEntries[project.id];
  });

  return sideProjects;
};

module.exports = {
  getAll() {
    return database
      .query(`SELECT * FROM side_projects ORDER BY state DESC, id DESC;
              SELECT side_project_id, url, title FROM blog WHERE side_project_id > 0 ORDER BY published ASC`)
      .then(([entries]) => joinBlogEntries(entries[0], entries[1]));
  },
};
