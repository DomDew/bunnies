import db from '../db';
import { Food } from '../interfaces';

export const createFood = ({ name, calories, deliciousness }: Food) => {
  db.run(
    'INSERT INTO foods (name, calories, deliciousness) VALUES ($name, $calories, $deliciousness)',
    [name, calories, deliciousness],
  );
};

export const createMultipleFoods = (foods: Food[]) => {
  const insertFood = db.prepare(
    'INSERT INTO foods (name, calories, deliciousness) VALUES ($name, $calories, $deliciousness)',
  );
  const insertFoods = db.transaction(() => {
    for (const food of foods) {
      insertFood.run({
        $name: food.name,
        $calories: food.calories,
        $deliciousness: food.deliciousness,
      });
    }

    return foods.length;
  });
  const foodCount = insertFoods(foods);

  return foodCount;
};

export const findFoods = () => {
  return db.query('SELECT * FROM foods;').all();
};

export const findFood = (id: number) => {
  return db.query('SELECT * FROM foods WHERE id = $id').get({ $id: id });
};

export const updateFood = (id: number, food: Food) => {
  db.run(
    'UPDATE foods SET name = $name, calories = $calories, deliciousness = $deliciousness WHERE id = $id',
    [food.name, food.calories, food.deliciousness, id],
  );
};

export const deleteFood = (id: number) => {
  db.run('DELETE FROM foods WHERE id = $id', [id]);
};
