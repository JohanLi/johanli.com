import { matchPath } from 'react-router-dom';
import blogModel from '../api/models/blog';

export default async (req) => {
  const blog = {
    entries: {},
    pages: {},
    archive: await blogModel.getArchive(),
    totalPages: await blogModel.getTotalPages(),
  };

  let entries = await blogModel.getPage(1);

  entries.forEach((entry) => {
    blog.entries[entry.url] = entry;
  });

  blog.pages[1] = entries.map(entry => entry.url);

  const match = matchPath(req.url, {
    path: '/blog/:pageOrUrlKey',
  });

  if (!match) {
    return blog;
  }

  const blogPageRequested = !isNaN(match.params.pageOrUrlKey);

  if (blogPageRequested) {
    entries = await blogModel.getPage(match.params.pageOrUrlKey);
  } else {
    entries = await blogModel.getByUrlKey(match.params.pageOrUrlKey);
  }

  entries.forEach((entry) => {
    blog.entries[entry.url] = entry;
  });

  if (blogPageRequested) {
    blog.pages[match.params.pageOrUrlKey] = entries.map(entry => entry.url);
  }

  return blog;
};
