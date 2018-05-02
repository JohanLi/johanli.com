import database from '../../database';
import { throwError } from '../helpers/error';
import prismjsHighlight from '../helpers/prismjsHighlight';
import imageContainer from '../helpers/imageContainer';

const entriesPerPage = 3;

const setPublished = entries => entries.map((entry) => {
  const date = new Date(entry.published * 1000);

  return {
    ...entry,
    published: {
      timestamp: entry.published,
      month: date.toLocaleString('en-us', { month: 'short', timeZone: 'UTC' }),
      date: date.getUTCDate(),
      year: date.getUTCFullYear(),
    },
  };
});

const setArchive = (entries) => {
  const archive = [];
  const seenYears = [];

  entries.forEach((entry) => {
    if (!seenYears.includes(entry.published.year)) {
      seenYears.push(entry.published.year);

      archive[seenYears.length - 1] = {
        year: entry.published.year,
        entries: [],
      };
    }

    archive[seenYears.length - 1].entries.push(entry);
  });

  return archive;
};

const getTotalPages = async () => {
  const result = await blog.entriesCount();

  return Math.ceil(result[0].numberOfEntries / entriesPerPage);
};

const blog = {
  getPage: async (page) => {
    const offset = (parseInt(page, 10) - 1) * entriesPerPage;

    let entries = await blog.page(entriesPerPage, offset);

    if (!entries.length) {
      throwError('not-found', 'No blog entries were found on this page.');
    }

    entries = setPublished(entries);
    entries = prismjsHighlight(entries);
    entries = imageContainer(entries);

    return {
      entries,
      totalPages: await getTotalPages(),
    };
  },

  getByUrlKey: async (urlKey) => {
    let entries = await blog.urlKey(urlKey);

    if (!entries.length) {
      throwError('not-found', 'No blog entry was found on this URL.');
    }

    entries = setPublished(entries);
    entries = prismjsHighlight(entries);
    entries = imageContainer(entries);

    return entries[0];
  },

  getArchive: async () => {
    let entries = await blog.archive();
    entries = setPublished(entries);

    return setArchive(entries);
  },

  getLatest: async () => {
    return await blog.latest();
  },

  page: async (entriesPerPage, offset) => {
    const [rows] = await database.query(`
      SELECT url, title, excerpt, html, published FROM blog
      ORDER BY published DESC
      LIMIT ? OFFSET ?
    `, [entriesPerPage, offset]);
    return rows;
  },

  urlKey: async urlKey => {
    const [rows] = await database.query(`
      SELECT url, title, excerpt, html, published FROM blog
      WHERE url = ?
      ORDER BY published DESC
    `, [urlKey]);
    return rows;
  },

  archive: async () => {
    const [rows] = await database.query(`
      SELECT url, title, published
      FROM blog
      ORDER BY published DESC
    `);
    return rows;
  },

  entriesCount: async () => {
    const [rows] = await database.query(`
      SELECT count(*) AS numberOfEntries
      FROM blog
    `);
    return rows;
  },

  latest: async () => {
    const [rows] = await database.query(`
      SELECT url, title, excerpt
      FROM blog
      ORDER BY published DESC
      LIMIT 3
    `);
    return rows;
  },
};

export default blog;
