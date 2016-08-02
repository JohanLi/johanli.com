var database = require('../database');
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

exports.get = function(callback) {

    database.query('SELECT * FROM blog ORDER BY published DESC', function (error, entries) {
        if (error)
            return callback(error);

        for (let entry of entries) {
            entry.published = new Date(entry.published * 1000);
            entry.published.monthName = monthNames[entry.published.getMonth()];
        }

        callback(entries);
    });

};