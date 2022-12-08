import type { Middleware } from '../types';

const jsonResponseHandler = (): Middleware => (next) => async (req) => {
  const response = await next(req);

  if (response.json) {
    return response.json();
  }
  return response;
};

export {
  jsonResponseHandler,
};
