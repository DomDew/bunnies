import db from '../db';
import { Bunny } from '../interfaces';

export const createBunny = ({ name, age, fluffiness }: Bunny) => {
  db.run(
    'INSERT INTO bunnies (name, age, fluffiness) VALUES ($name, $age, $fluffiness)',
    [name, age, fluffiness]
  );
};

export const findBunnies = () => {
  return db.query('SELECT * FROM bunnies;').all();
};
