import database from './database';

export default {
  async getMapObjects() {
    const [gyms] = await database.query('SELECT * FROM pokemon_go_map_objects WHERE type = 0');
    const [pokestops] = await database.query('SELECT * FROM pokemon_go_map_objects WHERE type = 1 AND neighbor_group_count > 2');

    return {
      gyms,
      pokestops,
    };
  },
};
