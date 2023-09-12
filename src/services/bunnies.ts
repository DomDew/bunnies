import db from "../db";
import { Bunny } from "../interfaces";

export const createBunny = ({
  name,
  age,
  fluffiness,
  favoriteFoodId,
}: Bunny) => {
  const food = db
    .query("SELECT * FROM foods WHERE id = $id")
    .get({ $id: favoriteFoodId });

  if (!food) {
    throw new Error("Food does not exist");
  }

  db.run(
    "INSERT INTO bunnies (name, age, fluffiness, favoriteFoodId) VALUES ($name, $age, $fluffiness, $favoriteFoodId)",
    [name, age, fluffiness, favoriteFoodId],
  );
};

export const createMultipleBunnies = (bunnies: Bunny[]) => {
  const insertBunny = db.prepare(
    "INSERT INTO bunnies (name, age, fluffiness, favoriteFoodId) VALUES ($name, $age, $fluffiness, $favoriteFoodId)",
  );
  const insertBunnies = db.transaction(() => {
    for (const bunny of bunnies) {
      insertBunny.run({
        $name: bunny.name,
        $age: bunny.age,
        $fluffiness: bunny.fluffiness,
        $favoriteFoodId: bunny.favoriteFoodId,
      });
    }
    return bunnies.length;
  });
  const bunnyCount = insertBunnies(bunnies);

  return bunnyCount;
};

export const findBunnies = () => {
  return db.query("SELECT * FROM bunnies;").all();
};

export const findBunnyById = (id: number) => {
  return db.query("SELECT * FROM bunnies WHERE id = $id").get({ $id: id });
};

export const updateBunnyById = (id: number, bunny: Bunny) => {
  const food = db
    .query("SELECT * FROM foods WHERE id = $id")
    .get({ $id: bunny.favoriteFoodId });

  if (!food) {
    throw new Error("Food does not exist");
  }

  db.run(
    "UPDATE bunnies SET name = $name, age = $age, fluffiness = $fluffiness, favoriteFoodId = $favoriteFoodId WHERE id = $id",
    [bunny.name, bunny.age, bunny.fluffiness, bunny.favoriteFoodId, id],
  );
};

export const deleteBunnyById = (id: number) => {
  db.run("DELETE FROM bunnies WHERE id = $id", [id]);
};
