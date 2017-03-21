const database = require('./database');

const setPublishedDate = (entries) => {
  entries.forEach((entry) => {
    entry.published = new Date(entry.published * 1000);
  });

  return entries;
};

module.exports = {
  async getAll() {
    const [entries] = await database.query('SELECT * FROM blog ORDER BY published DESC');
    return setPublishedDate(entries);
  },

  async getByUrl(url) {
    let [entries] = await database.query('SELECT * FROM blog WHERE url = ? ORDER BY published DESC', [url]);
    entries = setPublishedDate(entries);

    const [previousEntries] = await database.query('SELECT title, url FROM blog WHERE id < ? ORDER BY id DESC LIMIT 1', [entries[0].id]);
    const [nextEntries] = await database.query('SELECT title, url FROM blog WHERE id > ? ORDER BY id ASC LIMIT 1', [entries[0].id]);

    const pagination = {
      previous: previousEntries[0],
      next: nextEntries[0]
    };

    return [entries, pagination];
  },
};
