import {
  batchPostBunnies,
  deleteBunny,
  getBunnies,
  getBunny,
  postBunny,
  putBunny,
} from '../controllers/bunnies';
import {
  batchPostFoods,
  getFoods,
  postFood,
  putFood,
} from '../controllers/foods';
import router from '../router';
import { deleteFood } from '../services/foods';

const registerRoutes = () => {
  router.get('/bunnies', getBunnies);
  router.get('/bunnies/:id', getBunny);
  router.post('/bunnies', postBunny);
  router.post('/bunnies/batch', batchPostBunnies);
  router.put('/bunnies/:id', putBunny);
  router.delete('/bunnies/:id', deleteBunny);
  router.get('/foods', getFoods);
  router.post('/foods', postFood);
  router.post('/foods/batch', batchPostFoods);
  router.put('/foods/:id', putFood);
  router.delete('/foods/:id', deleteFood);
};

export default registerRoutes;
