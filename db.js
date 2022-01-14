// require .env module for authentication to access database
require("dotenv").config();

// use myqsl for accessing and modifying the database.
const mysql = require("mysql");

const Validator = require("jsonschema").Validator;
const validator = new Validator();

// creates pool for connections to db
const pool = mysql.createPool({
  connectionlimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

// Schema to validate words
const wordSchema = {
  type: "object",
  properties: {
    id: { type: "number", minimum: 1 },
    english: { type: "string", minLength: 2 },
    finnish: { type: "string", minLength: 2 },
    tag: { type: "string", minLength: 2 },
  },
  required: ["english", "finnish", "tag"],
};

/**
 * connectionFunctions contains all needed sql queries for accessing database, adding and deleting data from it.
 *
 * All functions return a promise that will be resolved when the sql query has been successfully completed.
 * In case the sql query fails, the promise will be rejected and proper error message will be logged to console.
 */
let connectionFunctions = {
  save: (content) => {
    return new Promise((resolve, reject) => {
      let validation = validator.validate(content, wordSchema);

      if (validation.errors.length > 0) {
        console.log(validation.errors.toString());
        reject(validation.errors.toString());
      } else {
        pool.query(
          "INSERT INTO words(english, finnish, tag) VALUES (?, ?, ?)",
          [content.english, content.finnish, content.tag],
          (err, res) => {
            if (err) {
              console.log(err.message);
              return reject(err);
            }
            resolve(res);
          }
        );
      }
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
  findByTag: (tag) => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM words WHERE tag = ?", [tag], (err, res) => {
        if (err) {
          console.log(err.message);
          return reject(err.message);
        }
        resolve(JSON.parse(JSON.stringify(res)));
      });
    });
  },
};

module.exports = connectionFunctions;
