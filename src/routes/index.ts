import { getBunnies, postBunny } from '../controllers/bunnies';
import router from '../router';

const registerRoutes = () => {
  router.get('/bunnies', getBunnies);
  router.post('/bunnies', postBunny);
  router.put(
    '/bunnies',
    () => new Response('Not implemented', { status: 501 })
  );
};

export default registerRoutes;
