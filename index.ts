import logger from './src/logger';
import router from './src/router';
import registerRoutes from './src/routes';

registerRoutes();

Bun.serve({
  async fetch(req) {
    logger(req);
    try {
      return router.handleRequest(req);
    } catch (err) {
      console.error(err);
      return new Response('Server Error', { status: 500 });
    }
  },
});

console.log(`🐰🐇: http://localhost:${process.env.BUN_PORT || 3000}`);
