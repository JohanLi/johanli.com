import database from '../../database';

export default {
  page: (entriesPerPage, offset) =>
    database.query('SELECT * FROM blog ORDER BY published DESC LIMIT ? OFFSET ?', [entriesPerPage, offset]),

  urlKey: urlKey =>
    database.query('SELECT * FROM blog WHERE url = ? ORDER BY published DESC', [urlKey]),

  archive: () =>
    database.query('SELECT url, title, published FROM blog ORDER BY published DESC'),

  entriesCount: () =>
    database.query('SELECT count(*) AS numberOfEntries FROM blog'),
};
