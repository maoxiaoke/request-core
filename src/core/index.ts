import { compose } from './compose.js';
import { fetch } from '../adaptor/fetch';
import { requestHandler } from '../middleware/request';
import { getRequestObject } from '../helpers/genRequestObject';

import type { Middleware, Req } from '../types';

type ParticalReq = Partial<Req>;

class Core {
  private middleware: Middleware[] = [requestHandler];
  private option: RequestInit = {};

  constructor(options: RequestInit) {
    this.option = options; // FIXME: 这需要这个配置吗
  }

  use(middleware: Middleware[] | Middleware) {
    this.middleware = Array.isArray(middleware) ? middleware.concat(this.middleware) : [...middleware, ...this.middleware];
  }

  request(url: string, options: ParticalReq = {}) {
    const dispatch = compose(...this.middleware);
    return dispatch(window.fetch)(getRequestObject(url, options));
  }

  get(url: string, options: ParticalReq = {}) {
    return this.request(url, {
      ...options,
      method: 'GET',
    });
  }

  post(url: string, options: ParticalReq = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
    });
  }

  put(url: string, options: ParticalReq = {}) {
    return this.request(url, {
      ...options,
      method: 'PUT',
    });
  }

  delete(url: string, options: ParticalReq = {}) {
    return this.request(url, {
      ...options,
      method: 'DELETE',
    });
  }
}

export default Core;
