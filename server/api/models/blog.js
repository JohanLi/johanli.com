import database from './database';
import prismjsHighlight from '../helpers/prismjsHighlight';
import imageContainer from '../helpers/imageContainer';

const entriesPerPage = 3;

const setPublished = entries => entries.map((entry) => {
  const date = new Date(entry.published * 1000);

  return {
    ...entry,
    published: {
      timestamp: entry.published,
      month: date.toLocaleString('en-us', { month: 'short' }),
      date: date.getDate(),
      year: date.getFullYear(),
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

const blog = {
  async getPage(page) {
    const pageInteger = parseInt(page, 10);

    const offset = (pageInteger - 1) * entriesPerPage;
    let [entries] = await database.query('SELECT * FROM blog ORDER BY published DESC LIMIT ? OFFSET ?', [entriesPerPage, offset]);

    if (!entries.length) {
      throw new Error('Page not found!');
    }

    entries = setPublished(entries);
    entries = prismjsHighlight(entries);
    entries = imageContainer(entries);

    return {
      entries,
      archive: await blog.getArchive(),
      totalPages: await blog.getTotalPages(),
    };
  },

  async getByUrlKey(urlKey) {
    let [entries] = await database.query('SELECT * FROM blog WHERE url = ? ORDER BY published DESC', [urlKey]);

    if (!entries.length) {
      throw new Error('URL not found!');
    }

    entries = setPublished(entries);
    entries = prismjsHighlight(entries);
    entries = imageContainer(entries);

    return {
      entries,
      archive: await blog.getArchive(),
      totalPages: await blog.getTotalPages(),
    };
  },

  async getArchive() {
    let [entries] = await database.query('SELECT url, title, published FROM blog ORDER BY published DESC');
    entries = setPublished(entries);

    return setArchive(entries);
  },

  async getTotalPages() {
    const [result] = await database.query('SELECT count(*) AS numberOfEntries FROM blog');

    return Math.ceil(result[0].numberOfEntries / entriesPerPage);
  },
};

export default blog;
