import type { Middleware, Req } from '../types';

// This builtin middleware is used to turn all request parmeters into a Request object
// This is the same as using `fetch` directly
const requestHandler: Middleware = (next) => async (req) => {
  const { url } = req;

  const request = new Request(url, req) as Req;
  return await next(request);
};

export {
  requestHandler,
};
