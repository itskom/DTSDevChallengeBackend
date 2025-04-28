const Database = require("better-sqlite3");

const db = new Database("tasks.db", { verbose: console.log });

// Creates table
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL,
    dueDateTime TEXT NOT NULL
  )
`);

module.exports = db;
