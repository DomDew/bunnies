import db from '../db';
import { Bunny } from '../interfaces';

export const createBunny = ({
  name,
  age,
  fluffiness,
  favoriteFoodId,
}: Bunny) => {
  // Insert into bunnies but throw error if favoriteFoodId doesn't exist in foods table
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
