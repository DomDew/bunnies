import { describe, expect, test } from 'bun:test';
import { getBunnies, postBunny } from './bunnies';

describe('bunnies-controller', () => {
  describe('getBunnies', () => {
    test('should return a list of bunnies', async () => {
      const bunnies = await getBunnies().json();
      expect(bunnies).toEqual([]);

      const bunny = {
        name: 'Bugs Bunny',
        id: 1,
        age: 80,
        fluffiness: 10,
      };

      const req = new Request('http://localhost:3000/bunnies', {
        method: 'POST',
        body: JSON.stringify(bunny),
      });

      await postBunny(req);

      const updatedBunnies = await getBunnies().json();
      expect(updatedBunnies).toEqual([bunny]);
    });
  });
});
