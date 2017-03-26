const database = require('./database');

const setPublished = (entries) => {
  entries.forEach((entry) => {
    const date = new Date(entry.published * 1000);

    entry.published = {
      timestamp: entry.published,
      month: date.toLocaleString('en-us', {month: "short"}),
      date: date.getDate(),
      year: date.getFullYear(),
    };
  });

  return entries;
};

const setArchive = (entries) => {
  let archive = [];
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

module.exports = {
  async getAll() {
    let [entries] = await database.query('SELECT * FROM blog ORDER BY published DESC');
    entries = setPublished(entries);

    const archive = setArchive(entries);

    return [entries, archive];
  },

  async getByUrl(url) {
    let [entries] = await database.query('SELECT * FROM blog WHERE url = ? ORDER BY published DESC', [url]);
    entries = setPublished(entries);

    const [previousEntries] = await database.query('SELECT title, url FROM blog WHERE id < ? ORDER BY id DESC LIMIT 1', [entries[0].id]);
    const [nextEntries] = await database.query('SELECT title, url FROM blog WHERE id > ? ORDER BY id ASC LIMIT 1', [entries[0].id]);

    const pagination = {
      previous: previousEntries[0],
      next: nextEntries[0],
    };

    return [entries, pagination];
  },
};
