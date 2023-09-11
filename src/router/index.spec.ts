import { describe, expect, test } from 'bun:test';
import router from '.';

describe('router', () => {
  const { get, post, put, routes } = router;

  describe('get', () => {
    test('should register a route', () => {
      const handler = () => {};

      get('/bunnies', handler);

      expect(routes.get.get('/bunnies')).toBe(handler);
    });
  });

  describe('post', () => {
    test('should register a route', () => {
      const handler = () => {};

      post('/bunnies', handler);

      expect(routes.post.get('/bunnies')).toBe(handler);
    });
  });

  describe('put', () => {
    test('should register a route', () => {
      const handler = () => {};

      put('/bunnies', handler);

      expect(routes.put.get('/bunnies')).toBe(handler);
    });
  });

  describe('delete', () => {
    test('should register a route', () => {
      const handler = () => {};

      router.delete('/bunnies', handler);

      expect(routes.delete.get('/bunnies')).toBe(handler);
    });
  });

  describe('handleRequest', () => {
    test('should return a 404 when no route is found', async () => {
      const req = new Request('http://localhost:3000/notfound', {
        method: 'GET',
      });

      const res = await router.handleRequest(req);

      expect(res.status).toBe(404);
    });

    test('should return a 200 when a route is found', async () => {
      const req = new Request('http://localhost:3000/bunnies', {
        method: 'GET',
      });

      get('/bunnies', () => new Response('Hello, world!'));

      const res = await router.handleRequest(req);

      expect(res.status).toBe(200);
    });
  });
});
