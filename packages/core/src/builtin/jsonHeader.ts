import type { Middleware } from '../types';

const jsonHeaderHandler = (): Middleware => (next) => async (req) => {
  const { headers } = req;
  headers.delete('Content-Type');
  headers.append('Content-type', 'application/json; charset=UTF-8');

  return await next(req);
};

export {
  jsonHeaderHandler,
};
