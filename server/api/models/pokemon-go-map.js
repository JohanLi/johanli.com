import database from '../../database';

export default {
  gyms: () =>
    database.query('SELECT * FROM pokemon_go_map_objects WHERE type = 0'),

  pokestops: () =>
    database.query('SELECT * FROM pokemon_go_map_objects WHERE type = 1 AND neighbor_group_count > 2'),
};
