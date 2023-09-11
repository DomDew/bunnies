type Method = 'get' | 'post' | 'put' | 'delete';

const routes = {
  get: new Map(),
  post: new Map(),
  put: new Map(),
  delete: new Map(),
} as const;

const registerRoute = (method: Method, path: string, handler: Function) => {
  routes[method].set(path, handler);
};

const get = (path: string, handler: Function) =>
  registerRoute('get', path, handler);
const post = (path: string, handler: Function) =>
  registerRoute('post', path, handler);

const handleRequest = async (req: Request) => {
  const { method, url } = req;

  const { pathname } = new URL(url);

  const route = routes[method.toLowerCase() as Method].get(pathname);

  if (route) {
    return await route(req);
  }

  return new Response('Not Found', { status: 404 });
};

export default {
  get,
  post,
  handleRequest,
};
