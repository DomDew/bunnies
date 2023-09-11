import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import seeds from '../db/seeds';
import { Bunny, Food } from '../interfaces';
import { getBunnies, postBunny } from './bunnies';
import { getFoods } from './foods';

describe('bunnies-controller', () => {
  beforeAll(() => {
    seeds.reset();
    seeds.populate();
  });

  afterAll(() => {
    seeds.reset();
  });

  describe('getBunnies', () => {
    test('should return a list of bunnies', async () => {
      const bunnies = await getBunnies().json<Bunny[]>();
      expect(bunnies.length).toEqual(seeds.bunnies.length);
    });
  });

  describe('postBunny', () => {
    test('should create a bunny', async () => {
      const foods = await getFoods().json<Food & { id: number }[]>();

      const bunny = {
        name: 'Bugs Bunny',
        age: 80,
        favoriteFoodId: foods[0].id,
        fluffiness: 10,
      };

      const req = new Request('http://localhost:3000/bunnies', {
        method: 'POST',
        body: JSON.stringify(bunny),
      });

      const res = await postBunny(req);

      expect(res.status).toEqual(201);
    });
  });
});
