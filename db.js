const mysql = require("mysql");

// use pool for connections to db
const pool = mysql.createPool({
  connectionlimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

let connectionFunctions = {
  save: (content, callback) => {},
  findAll: (callback) => {},
  findById: (callback) => {},
};

module.exports = connectionFunctions;
