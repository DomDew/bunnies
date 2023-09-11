import { getBunnies, getBunny, postBunny } from '../controllers/bunnies';
import { getFoods, postFood } from '../controllers/foods';
import router from '../router';

const registerRoutes = () => {
  router.get('/bunnies', getBunnies);
  router.get('/bunnies/:id', getBunny);
  router.post('/bunnies', postBunny);
  router.get('/foods', getFoods);
  router.post('/foods', postFood);
};

export default registerRoutes;
