var database = require('./database');

function select(sql, values) {

    return new Promise(function (resolve, reject) {

        database.query(sql, values, function (error, entries) {
            if (error)
                reject(error);

            for (let entry of entries) {
                entry.published = new Date(entry.published * 1000);
            }

            resolve(entries);
        });

    });

}

module.exports = {

    getAll: function() {
        return select('SELECT * FROM blog ORDER BY published DESC', []);
    },

    getByUrl(url) {
        return select('SELECT * FROM blog WHERE url = ? ORDER BY published DESC', [url]);
    }

};