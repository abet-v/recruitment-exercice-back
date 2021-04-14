"use strict";

const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = './database.sqlite3';
let db = new sqlite3.Database(DBSOURCE, err => {
  if (err) {
    return console.error(err.message);
  }

  console.log('Connected to the in-memory SQlite database.');
});
module.exports = db;