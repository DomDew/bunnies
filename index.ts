import logger from './src/logger';
import router from './src/router';
import registerRoutes from './src/router/routes';

registerRoutes();

Bun.serve({
  fetch(req) {
    logger(req);
    return router.handleRequest(req);
  },
});

console.log(`Listening on http://localhost:${process.env.BUN_PORT || 3000}`);
