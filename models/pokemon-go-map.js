const database = require('./database');

module.exports = {

    getMapObjects() {
        return Promise.all([this.getGyms(), this.getPokestops()])
            .then(([[gyms], [pokestops]]) => {
                return {
                    gyms: gyms,
                    pokestops: pokestops
                };
            });
    },

    getGyms() {
        return database.query('SELECT * FROM pokemon_go_map_objects WHERE type = 0');
    },

    getPokestops() {
        return database.query('SELECT * FROM pokemon_go_map_objects WHERE type = 1 AND neighbor_group_count > 2');
    }

};