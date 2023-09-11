import db from '../db';
import { Bunny } from '../interfaces';

export const createBunny = ({
  name,
  age,
  fluffiness,
  favoriteFoodId,
}: Bunny) => {
  const food = db
    .query('SELECT * FROM foods WHERE id = $id')
    .get({ $id: favoriteFoodId });

  if (!food) {
    throw new Error('Food does not exist');
  }

  db.run(
    'INSERT INTO bunnies (name, age, fluffiness, favoriteFoodId) VALUES ($name, $age, $fluffiness, $favoriteFoodId)',
    [name, age, fluffiness, favoriteFoodId]
  );
};

export const findBunnies = () => {
  return db.query('SELECT * FROM bunnies;').all();
};

export const findBunny = (id: number) => {
  return db.query('SELECT * FROM bunnies WHERE id = $id').get({ $id: id });
};
