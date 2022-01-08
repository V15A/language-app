// require .env for authentication to access database
require("dotenv").config();

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
  save: (content) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "INSERT INTO words(english, finnish, ag) VALUES (?, ?, ?)",
        [content.english, content.finnish, content.tag],
        (err, res) => {
          if (err) {
            console.log(err.message);
            return reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  findAll: () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM words", (err, res) => {
        if (err) {
          console.log(err.message);
          return reject(err.message);
        }
        resolve(JSON.parse(JSON.stringify(res)));
      });
    });
  },
  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      pool.query("DELETE * FROM words WHERE id = ?", [id], (err, res) => {
        if (err) {
          console.log(err.message);
          return reject(err);
        }
        resolve(res);
      });
    });
  },
  findByTag: (tag) => {},
};

module.exports = connectionFunctions;
