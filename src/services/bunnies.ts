import db from '../db';

interface Bunny {
  name: string;
  age: number;
  fluffiness: number;
}

export const createBunny = ({ name, age, fluffiness }: Bunny) => {
  db.run(
    'INSERT INTO bunnies (name, age, fluffiness) VALUES ($name, $age, $fluffiness)',
    [name, age, fluffiness]
  );
};

export const findBunnies = () => {
  return db.query('SELECT * FROM bunnies;').all();
};
