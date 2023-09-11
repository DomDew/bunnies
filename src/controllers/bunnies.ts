import { Bunny } from '../interfaces';
import { createBunny, findBunnies, findBunny } from '../services/bunnies';

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

export const getBunny = (_req: Request, { id }: { id: string }) => {
  const bunny = findBunny(Number(id));

  if (!bunny) {
    return new Response('Bunny does not exist', { status: 404 });
  }

  return new Response(JSON.stringify(findBunny(Number(id))));
};
