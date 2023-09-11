import db from '.';

const foods = [
  {
    $name: 'Carrot',
    $calories: 50,
    $deliciousness: 5,
  },
  {
    $name: 'Lettuce',
    $calories: 10,
    $deliciousness: 1,
  },
];

const bunnies = [
  {
    $name: 'Bugs Bunny',
    $age: 80,
    $favoriteFoodId: 1,
    $fluffiness: 10,
  },
  {
    $name: 'Roger Rabbit',
    $age: 30,
    $favoriteFoodId: 2,
    $fluffiness: 5,
  },
];

const reset = () => {
  console.log('Resetting the database...');
  db.run('DELETE FROM foods');
  db.run('DELETE FROM bunnies');
};

const populate = () => {
  console.log('Seeding foods...');
  const insertFood = db.prepare(
    'INSERT INTO foods (name, calories, deliciousness) VALUES ($name, $calories, $deliciousness)'
  );
  const insertFoods = db.transaction(() => {
    for (const food of foods) {
      insertFood.run(food);
    }
    return foods.length;
  });
  const foodCount = insertFoods(foods);

  console.log(`Seeded ${foodCount} foods`);

  console.log('Seeding bunnies...');
  const insertBunny = db.prepare(
    'INSERT INTO bunnies (name, age, fluffiness, favoriteFoodId) VALUES ($name, $age, $fluffiness, $favoriteFoodId)'
  );
  const insertBunnies = db.transaction(() => {
    for (const bunny of bunnies) {
      insertBunny.run(bunny);
    }
    return bunnies.length;
  });
  const bunnyCount = insertBunnies(bunnies);

  console.log(`Seeded ${bunnyCount} bunnies`);
};

export default {
  reset,
  populate,
  foods,
  bunnies,
};
