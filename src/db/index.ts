import Database from 'bun:sqlite';

const db = new Database(':memory:');

db.run(
  'CREATE TABLE IF NOT EXISTS bunnies (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER, fluffiness INTEGER, favoriteFoodId INTEGER, FOREIGN KEY (favoriteFoodId) REFERENCES foods(id))'
);
db.run(
  'CREATE TABLE IF NOT EXISTS foods (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, calories INTEGER, deliciousness INTEGER)'
);

export default db;
