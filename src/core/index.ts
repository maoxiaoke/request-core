import { compose } from './compose.js';
import { fetch } from '../adaptor/fetch';
import { requestHandler } from '../middleware/request';
import { getRequestObject } from '../helpers/genRequestObject';

import type { Middleware, Req, Res } from '../types';

const toArray = <T>(arg: T | T[]): T[] => (Array.isArray(arg) ? arg : [arg]);

class Core <T extends Req = Req, U extends Res = Res> {
  private middleware: Middleware[] = [requestHandler];

  use(middleware: Middleware[] | Middleware) {
    this.middleware = toArray(middleware).concat(this.middleware);
  }

  request(url: string, options: Partial<T>): Promise<U> {
    const dispatch = compose(...this.middleware);
    return dispatch(fetch)(getRequestObject(url, options));
  }

  get(url: string, options?: Partial<T>) {
    return this.request(url, { ...options, method: 'GET' });
  }

  post(url: string, options: Partial<T>) {
    return this.request(url, { ...options, method: 'POST' });
  }

  put(url: string, options: Partial<T>) {
    return this.request(url, { ...options, method: 'PUT' });
  }

  delete(url: string, options: Partial<T>) {
    return this.request(url, { ...options, method: 'DELETE' });
  }

  head(url: string, options: Partial<T>) {
    return this.request(url, { ...options, method: 'HEAD' });
  }

  patch(url: string, options: Partial<T>) {
    return this.request(url, { ...options, method: 'PATCH' });
  }
}

export default Core;
