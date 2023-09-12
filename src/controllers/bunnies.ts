import { Bunny } from "../interfaces";
import {
  createBunny,
  createMultipleBunnies,
  deleteBunnyById,
  findBunnies,
  findBunnyById,
  updateBunnyById,
} from "../services/bunnies";

export const postBunny = async (req: Request) => {
  try {
    const body = await req.json<Bunny>();
    createBunny(body);
    return new Response("", { status: 201 });
  } catch {
    return new Response("Food does not exist", { status: 400 });
  }
};

export const batchPostBunnies = async (req: Request) => {
  try {
    const body = await req.json<Bunny[]>();
    const bunnyCount = createMultipleBunnies(body);
    return new Response(`${bunnyCount} bunnies created`, { status: 201 });
  } catch {
    return new Response("Food does not exist", { status: 400 });
  }
};

export const getBunnies = () => new Response(JSON.stringify(findBunnies()));

export const getBunny = (_req: Request, { id }: { id: string }) => {
  const bunny = findBunnyById(Number(id));

  if (!bunny) {
    return new Response("Bunny does not exist", { status: 404 });
  }

  return new Response(JSON.stringify(findBunnyById(Number(id))));
};

export const putBunny = async (req: Request, { id }: { id: string }) => {
  try {
    const body = await req.json<Bunny>();
    const bunny = findBunnyById(Number(id));

    if (!bunny) {
      return new Response("Bunny does not exist", { status: 404 });
    }

    updateBunnyById(Number(id), body);
    return new Response("", { status: 204 });
  } catch (err) {
    console.error(err);
    return new Response("Food does not exist", { status: 400 });
  }
};

export const deleteBunny = (_req: Request, { id }: { id: string }) => {
  const bunny = findBunnyById(Number(id));

  if (!bunny) {
    return new Response("Bunny does not exist", { status: 404 });
  }

  deleteBunnyById(Number(id));

  return new Response("", { status: 204 });
};
