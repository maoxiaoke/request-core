import type { Middleware } from '../types';
import type { ExtendReq, ExtendRes } from '../index';

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

const queryHandler: Middleware<ExtendReq, ExtendRes> = (next) => async (req) => {
  const { query, url } = req;

  if (query) {
    req.url = url + genQueryString(query);
  }

  return await next(req);
};

export {
  queryHandler,
};
