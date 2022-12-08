/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import type { Req } from '../types';

export const getRequestObject = <T extends Req>(url: string, requestOption: Partial<T>) => {
  const request = new Request(url, requestOption);

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const _req: T = {} as T;

  for (const key in request) {
    if (Object.prototype.hasOwnProperty.call(request, key)) {
      if (key === 'body' || key === 'url') {
        _req.body = requestOption?.body;
        continue;
      }

      _req[key] = request[key];
    }
  }

  return _req;
};
