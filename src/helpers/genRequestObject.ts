/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import type { Req } from '../types';

export const getRequestObject = (url: string, requestOptoin: Partial<Req>) => {
  const request = new Request(url, requestOptoin);

  const _req: Req = {};

  // FXIME: 应该传递哪些内容，需要再确认一下
  for (const key in request) {
    _req[key] = request[key];
  }

  _req.url = url;


  return _req;
};
