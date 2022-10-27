/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import type { Middleware, Req } from '../types';

// 这个内置插件的作用
const requestHandler: Middleware = (next) => async (req) => {
  const { url } = req;

  const request = new Request(url, req) as Req;
  return await next(request);
};

export {
  requestHandler,
};
