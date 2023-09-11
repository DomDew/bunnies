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
const put = (path: string, handler: Function) =>
  registerRoute('put', path, handler);
const deleteMethod = (path: string, handler: Function) =>
  registerRoute('delete', path, handler);

const matchRoute = async (req: Request) => {
  const { method, url } = req;

  const { pathname } = new URL(url);

  const route = routes[method.toLowerCase() as Method].get(pathname);

  if (route) {
    return route(req);
  }

  for (const [routePath, routeHandler] of routes[
    method.toLowerCase() as Method
  ]) {
    const params = matchRouteWithParams(routePath, pathname);

    if (params) {
      return routeHandler(req, params);
    }
  }

  return new Response('Not found', { status: 404 });
};

const matchRouteWithParams = (route: string, pathname: string) => {
  const routeParts = route.split('/');
  const pathnameParts = pathname.split('/');
  const params: Record<string, string> = {};

  if (routeParts.length !== pathnameParts.length) {
    return false;
  }

  for (let i = 0; i < routeParts.length; i++) {
    const routePart = routeParts[i];
    const pathnamePart = pathnameParts[i];

    if (routePart.startsWith(':')) {
      const key = routePart.slice(1);
      params[key] = pathnamePart;
    } else if (routePart !== pathnamePart) {
      return false;
    }
  }

  return params;
};

export default {
  get,
  post,
  put,
  delete: deleteMethod,
  matchRoute,
  routes,
};
