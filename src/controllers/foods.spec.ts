import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import seeds from '../db/seeds';
import { Food } from '../interfaces';
import { getFoods, postFood } from './foods';

describe('foods-controller', () => {
  beforeAll(() => {
    seeds.reset();
    seeds.populate();
  });

  afterAll(() => {
    seeds.reset();
  });

  describe('getFoods', () => {
    test('should return a list of foods', async () => {
      const foods = await getFoods().json<Food[]>();
      expect(foods.length).toEqual(seeds.foods.length);
    });
  });

  describe('postFood', () => {
    test('should create a food', async () => {
      const food = {
        name: 'Carrot',
        calories: 50,
        deliciousness: 5,
      };

      const req = new Request('http://localhost:3000/foods', {
        method: 'POST',
        body: JSON.stringify(food),
      });

      const res = await postFood(req);

      expect(res.status).toEqual(201);
    });
  });
});
