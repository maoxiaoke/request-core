import type { Middleware } from '../types';

const jsonHeaderHandler = (): Middleware => (next) => async (req) => {
  const { headers, body } = req;
  headers.delete('Content-Type');
  headers.append('Content-type', 'application/json; charset=UTF-8');

  if (body && typeof body !== 'string') {
    req.body = JSON.stringify(body);
  }

  return await next(req);
};

export {
  jsonHeaderHandler,
};
