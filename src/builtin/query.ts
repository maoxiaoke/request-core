import type { Middleware } from '../types';

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


// 这个内置插件的作用
const queryHandler: Middleware = (next) => async (req) => {
  return await next(req);
};

export {
  queryHandler,
};
