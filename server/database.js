import mysql from 'mysql2/promise';

const database = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_TABLE,
  multipleStatements: true,
});

export default database;
