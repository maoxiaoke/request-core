import { compose } from './compose.js';

import type { Middleware } from './types';

class Core {
  private middleware: Middleware[] = [];
  private option: RequestInit = {};

  constructor(options: RequestInit) {
    this.option = options;
  }

  use(middleware: Middleware) {
    this.middleware = [...this.middleware, middleware];
  }

  request() {
    const dispatch = compose(...this.middleware);
    return dispatch(fetch)(this.option);
  }
}

export default Core;

// export const reque

