import type { Middleware, Req } from '../types';

interface QueryMiddlewareReq extends Req {
  query?: Record<string, any>;
}

export const isNullable = (val: unknown) => {
  return val === null || val === undefined;
};

export const genQueryString = (querys: Record<string, any>) => {
  const queryStr = Object.keys(querys)
    .filter((key) => !isNullable(querys[key]))
    .map((key) => `${key}=${querys[key]}`)
    .join('&');

  if (queryStr) {
    return `?${queryStr}`;
  }

  // Return empty string if no query string
  return '';
};

interface QueryMiddlewareReq extends Req {
  query?: Record<string, any>;
}

const queryHandler = <T extends QueryMiddlewareReq>(): Middleware<T> => (next) => async (req) => {
  const { query, url } = req;

  if (query) {
    req.url = url + genQueryString(query);
  }

  return await next(req);
};

export {
  queryHandler,
};
