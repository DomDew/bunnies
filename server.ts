import logger from "./src/logger";
import router from "./src/router";
import registerRoutes from "./src/routes";

registerRoutes();

Bun.serve({
  fetch(req) {
    logger(req);
    return router.matchRoute(req);
  },
  error(err) {
    console.log(err);
    return new Response("Server Error", { status: 500 });
  },
});

console.log(`🐰🐇: http://localhost:${process.env.BUN_PORT || 3000}`);
