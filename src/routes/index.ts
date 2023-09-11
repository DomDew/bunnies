import { getBunnies, postBunny } from '../controllers/bunnies';
import router from '../router';

const registerRoutes = () => {
  router.get('/bunnies', getBunnies);
  router.post('/bunnies', postBunny);
};

export default registerRoutes;
