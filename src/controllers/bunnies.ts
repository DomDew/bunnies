import { Bunny } from '../interfaces';
import { createBunny, findBunnies } from '../services/bunnies';

export const postBunny = async (req: Request) => {
  const body = await req.json<Bunny>();
  return new Response(JSON.stringify(createBunny(body)));
};

export const getBunnies = () => new Response(JSON.stringify(findBunnies()));
