import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import seeds from "../db/seeds";
import { Food } from "../interfaces";
import { getFood, getFoods, postFood } from "./foods";

describe("foods-controller", () => {
  beforeAll(() => {
    seeds.reset();
    seeds.populate();
  });

  afterAll(() => {
    seeds.reset();
  });

  describe("getFoods", () => {
    test("should return a list of foods", async () => {
      const foods = await getFoods().json<Food[]>();
      expect(foods.length).toEqual(seeds.foods.length);
    });
  });

  describe("getFood", () => {
    test("should return a food", async () => {
      const foods = await getFoods().json<Food & { id: number }[]>();
      const food = foods[0];

      const req = new Request(`http://localhost:3000/foods/${food.id}`);
      const res = getFood(req, { id: food.id.toString() });

      expect(res.status).toEqual(200);
      expect(await res.json()).toEqual(food);
    });

    test("should return a 404 if food does not exist", () => {
      const req = new Request("http://localhost:3000/foods/999");
      const res = getFood(req, { id: "999" });

      expect(res.status).toEqual(404);
    });
  });

  describe("postFood", () => {
    test("should create a food", async () => {
      const food = {
        name: "Carrot",
        calories: 50,
        deliciousness: 5,
      };

      const req = new Request("http://localhost:3000/foods", {
        method: "POST",
        body: JSON.stringify(food),
      });

      const res = await postFood(req);

      expect(res.status).toEqual(201);
    });
  });

  describe("batchPostFoods", () => {
    test("should create multiple foods", async () => {
      const foods = [
        {
          name: "Carrot",
          calories: 50,
          deliciousness: 5,
        },
        {
          name: "Lettuce",
          calories: 25,
          deliciousness: 2,
        },
      ];

      const req = new Request("http://localhost:3000/foods/batch", {
        method: "POST",
        body: JSON.stringify(foods),
      });

      const res = await postFood(req);

      expect(res.status).toEqual(201);
    });
  });
});
