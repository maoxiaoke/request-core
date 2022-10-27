import type { Middleware } from '../types';

const corsHandler: Middleware = (next) => async (req) => {
  req.credentials = 'include';
  return await next(req);
};

export {
  corsHandler,
};
