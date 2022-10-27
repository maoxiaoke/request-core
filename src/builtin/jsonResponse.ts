import type { Middleware } from '../types';

const jsonResponseHandler: Middleware = (next) => async (req) => {
  const { headers } = req;
  // FIXME: what is the charset of the request?
  headers.append('Content-type', 'application/json; charset=UTF-8');

  const response = await next(req);

  return response.json();
};

export {
  jsonResponseHandler,
};
