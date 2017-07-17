const path = require('path');

const filepaths = {
  img: (process.env.NODE_ENV === 'production')
    ? path.join(__dirname, 'public')
    : path.join(__dirname, '../../../public'),
};

module.exports = filepaths;
