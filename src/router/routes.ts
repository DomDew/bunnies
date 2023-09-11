import router from '.';
import { createBunny, getBunnies } from '../modules/bunnies';

const registerRoutes = () => {
  router.get('/bunnies', getBunnies);
  router.post('/bunnies', createBunny);
};

export default registerRoutes;
