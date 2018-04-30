import database from '../../database';

export default {
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
