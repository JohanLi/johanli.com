import database from '../../database';

export default {
  gyms: async () => {
    const [rows] = await database.query(`
      SELECT latitude, longitude
      FROM pokemon_go_map_objects
      WHERE type = 0
    `);
    return rows;
  },

  pokestops: async () => {
    const [rows] = await database.query(`
      SELECT latitude, longitude
      FROM pokemon_go_map_objects
      WHERE type = 1 AND neighbor_group_count > 2
    `);
    return rows;
  },
};
