/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import type { Req } from '../types';

export const getRequestObject = <T extends Req>(url: string, requestOption: Partial<T>) => {
  const request = new Request(url, requestOption);

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const _req: T = {} as T;

  for (const key in request) {
    if (key === 'body' || key === 'url') {
      _req.body = requestOption?.body;
      _req.url = url;
      continue;
    }

    _req[key] = request[key];
  }

  Object.keys(requestOption).forEach((key) => {
    if (!_req.hasOwnProperty(key)) {
      _req[key] = requestOption[key];
    }
  });

  return _req;
};
