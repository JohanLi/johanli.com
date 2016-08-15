const database = require('../database');

class PokemonGoMap {

    getMapObjects() {

        let mapObjects = {};

        return this.getGyms()
            .then(gyms => {
                mapObjects.gyms = gyms;
                return this.getPokestops();
            })
            .then(pokestops => {
                mapObjects.pokestops = pokestops;
                return mapObjects;
            });

    }

    getGyms() {

        return new Promise((resolve, reject) => {

            database.query('SELECT * FROM pokemon_go_map_objects WHERE type = 0', (err, results) => {
                if (err)
                    reject(err);

                resolve(results);
            });

        });

    }

    getPokestops() {

        return new Promise((resolve, reject) => {

            database.query('SELECT * FROM pokemon_go_map_objects WHERE type = 1 AND neighbor_group_count > 2', (err, results) => {
                if (err)
                    reject(err);

                resolve(results);
            });

        });

    }

}

module.exports = new PokemonGoMap();