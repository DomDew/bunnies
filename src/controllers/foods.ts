import { Food } from '../interfaces';
import { createFood, findFoods } from '../services/foods';

export const postFood = async (req: Request) => {
  const body = await req.json<Food>();
  createFood(body);
  return new Response('', { status: 201 });
};

export const getFoods = () => new Response(JSON.stringify(findFoods()));
