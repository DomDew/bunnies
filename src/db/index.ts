import Database from 'bun:sqlite';

const db = new Database(':memory:');
db.run(
  'CREATE TABLE IF NOT EXISTS bunnies (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER, fluffiness INTEGER)'
);

export default db;
