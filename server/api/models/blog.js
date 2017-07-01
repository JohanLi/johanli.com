const database = require('./database');
const prismjsHighlight = require('../helpers/prismjsHighlight');
const imageContainer = require('../helpers/imageContainer');

const entriesPerPage = 3;
const previousNextCount = 2;

const setPublished = (entries) => {
  entries.forEach((entry) => {
    const date = new Date(entry.published * 1000);

    entry.published = {
      timestamp: entry.published,
      month: date.toLocaleString('en-us', { month: 'short' }),
      date: date.getDate(),
      year: date.getFullYear(),
    };
  });

  return entries;
};

const getUrl = (path) => {
  if (path === 1) {
    return '/blog';
  }

  return `/blog/${path}`;
};

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

const getPages = (currentPage, totalPages) => {
  const pages = [];
  let i = currentPage - previousNextCount;

  while (pages.length <= previousNextCount * 2 && i <= totalPages) {
    if (i > 0) {
      pages.push({
        url: getUrl(i),
        number: i,
      });
    }

    i += 1;
  }

  return pages;
};

module.exports = {
  async getLatest() {
    const [entries] = await database.query('SELECT url, title, excerpt FROM blog ORDER BY published DESC LIMIT 3');
    return entries;
  },

  async getArchive() {
    let [entries] = await database.query('SELECT url, title, published FROM blog ORDER BY published DESC');
    entries = setPublished(entries);
    return setArchive(entries);
  },

  async getPage(page = 1) {
    if (isNaN(page)) {
      return this.getByUrlKey(page);
    }

    const pageInteger = parseInt(page, 10);

    const offset = (pageInteger - 1) * entriesPerPage;
    let [entries] = await database.query('SELECT * FROM blog ORDER BY published DESC LIMIT ? OFFSET ?', [entriesPerPage, offset]);
    const pagination = await this.getPagination(pageInteger);

    if (!entries.length) {
      throw new Error('Page not found!');
    }

    entries = setPublished(entries);
    entries = prismjsHighlight(entries);
    entries = imageContainer(entries);

    return { entries, pagination };
  },

  async getByUrlKey(urlKey) {
    let [entries] = await database.query('SELECT * FROM blog WHERE url = ? ORDER BY published DESC', [urlKey]);

    if (!entries.length) {
      throw new Error('URL not found!');
    }

    entries = setPublished(entries);
    entries = prismjsHighlight(entries);
    entries = imageContainer(entries);

    return { entries };
  },

  async getPagination(currentPage) {
    const pagination = {};

    const [result] = await database.query('SELECT count(*) AS numberOfEntries FROM blog');
    const totalPages = Math.ceil(result[0].numberOfEntries / entriesPerPage);

    if (currentPage > 1) {
      pagination.previous = {
        url: getUrl(currentPage - 1),
      };
    }

    if (currentPage < totalPages) {
      pagination.next = {
        url: getUrl(currentPage + 1),
      };
    }

    pagination.pages = getPages(currentPage, totalPages);
    pagination.currentPage = currentPage;

    return pagination;
  },
};
