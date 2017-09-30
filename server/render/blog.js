import { matchPath } from 'react-router-dom';
import blogModel from '../api/models/blog';

export default async (req) => {
  const { entries, archive, totalPages } = await blogModel.getPage(1);
  const blog = {
    entries: {},
    pages: {},
    archive,
    totalPages,
  };

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

  let requestedBlog = {
    entries: [],
  };

  if (blogPageRequested) {
    requestedBlog = await blogModel.getPage(match.params.pageOrUrlKey);
  } else {
    requestedBlog = await blogModel.getByUrlKey(match.params.pageOrUrlKey);
  }

  const requestedEntries = requestedBlog.entries;
  requestedEntries.forEach((entry) => {
    blog.entries[entry.url] = entry;
  });

  if (blogPageRequested) {
    blog.pages[match.params.pageOrUrlKey] = requestedEntries.map(entry => entry.url);
  }

  return blog;
};
