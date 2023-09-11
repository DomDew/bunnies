import db from '../../db';

interface Bunny {
  name: string;
  age: number;
  fluffiness: number;
}

export const createBunny = ({ name, age, fluffiness }: Bunny) => {
  console.log('Running Create');
  try {
    db.run(
      'INSERT INTO bunnies (name, age, fluffiness) VALUES ($name, $age, $fluffiness)',
      [name, age, fluffiness]
    );
  } catch (err) {
    console.error(err);
    return new Response('Error', { status: 500 });
  }

  return new Response('Created Bunny', { status: 200 });
};

export const getBunnies = () => {
  const bunnies = db.query('SELECT * FROM bunnies;').all();

  return new Response(JSON.stringify(bunnies));
};
