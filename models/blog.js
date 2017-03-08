const database = require('./database');

const setPublishedDate = (entries) => {
  entries.forEach((entry) => {
    entry.published = new Date(entry.published * 1000);
  });

  return entries;
};

module.exports = {
  getAll() {
    return database
      .query('SELECT * FROM blog ORDER BY published DESC')
      .then(([entries]) => setPublishedDate(entries));
  },

  getByUrl(url) {
    return database
      .query('SELECT * FROM blog WHERE url = ? ORDER BY published DESC', [url])
      .then(([entries]) => setPublishedDate(entries));
  },
};
