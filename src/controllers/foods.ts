import { Food } from '../interfaces';
import { createFood, findFoods } from '../services/foods';

export const postFood = async (req: Request) => {
  const body = await req.json<Food>();
  const item = createFood(body);
  return new Response(JSON.stringify(item), { status: 201 });
};

export const getFoods = () => new Response(JSON.stringify(findFoods()));
