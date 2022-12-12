import { compose } from './compose.js';
import { fetch } from '../adaptor/fetch';
import { requestHandler } from '../middleware/request';
import { getRequestObject } from '../helpers/genRequestObject';

import type { Middleware, Req } from '../types';

const toArray = <T>(arg: T | T[]): T[] => (Array.isArray(arg) ? arg : [arg]);

class Core <T extends Req = Req> {
  private middleware: Middleware[] = [requestHandler];

  use(middleware: Middleware[] | Middleware) {
    this.middleware = toArray(middleware).concat(this.middleware);
  }

  request<U = any>(url: string, options: Partial<T>): Promise<U> {
    const dispatch = compose(...this.middleware);
    return dispatch(fetch)(getRequestObject(url, options));
  }

  get<U = any>(url: string, options?: Partial<T>) {
    return this.request<U>(url, { ...options, method: 'GET' });
  }

  post<U = any>(url: string, options: Partial<T>): Promise<U> {
    return this.request(url, { ...options, method: 'POST' });
  }

  put<U = any>(url: string, options: Partial<T>): Promise<U> {
    return this.request(url, { ...options, method: 'PUT' });
  }

  delete<U = any>(url: string, options?: Partial<T>): Promise<U> {
    return this.request(url, { ...options, method: 'DELETE' });
  }

  head<U = any>(url: string, options?: Partial<T>): Promise<U> {
    return this.request(url, { ...options, method: 'HEAD' });
  }

  patch<U = any>(url: string, options?: Partial<T>): Promise<U> {
    return this.request(url, { ...options, method: 'PATCH' });
  }
}

export default Core;
