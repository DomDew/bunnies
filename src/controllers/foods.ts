import { Food } from '../interfaces';
import {
  createFood,
  createMultipleFoods,
  findFood,
  findFoods,
  updateFood,
} from '../services/foods';

export const postFood = async (req: Request) => {
  const body = await req.json<Food>();
  const item = createFood(body);
  return new Response(JSON.stringify(item), { status: 201 });
};

export const batchPostFoods = async (req: Request) => {
  const body = await req.json<Food[]>();
  const foodCount = createMultipleFoods(body);
  return new Response(`${foodCount} foods created`, { status: 201 });
};

export const getFoods = () => new Response(JSON.stringify(findFoods()));

export const getFood = (_req: Request, { id }: { id: string }) => {
  const food = findFood(Number(id));

  if (!food) {
    return new Response('Food does not exist', { status: 404 });
  }

  return new Response(JSON.stringify(food));
};

export const putFood = async (req: Request, { id }: { id: string }) => {
  const body = await req.json<Food>();
  const food = findFood(Number(id));

  if (!food) {
    return new Response('Food does not exist', { status: 404 });
  }

  updateFood(Number(id), body);
  return new Response('', { status: 204 });
};

export const deleteFood = (_req: Request, { id }: { id: string }) => {
  const food = findFood(Number(id));

  if (!food) {
    return new Response('Food does not exist', { status: 404 });
  }

  return new Response('', { status: 204 });
};
