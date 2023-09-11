import db from '../db';
import { Food } from '../interfaces';

export const createFood = ({ name, calories, deliciousness }: Food) => {
  db.run(
    'INSERT INTO foods (name, calories, deliciousness) VALUES ($name, $calories, $deliciousness)',
    [name, calories, deliciousness]
  );
};

export const findFoods = () => {
  return db.query('SELECT * FROM foods;').all();
};
