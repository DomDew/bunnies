import { Bunny } from '../interfaces';
import { createBunny, findBunnies } from '../services/bunnies';

export const postBunny = async (req: Request) => {
  try {
    const body = await req.json<Bunny>();
    createBunny(body);
    return new Response('', { status: 201 });
  } catch {
    return new Response('Food does not exist', { status: 400 });
  }
};

export const getBunnies = () => new Response(JSON.stringify(findBunnies()));
