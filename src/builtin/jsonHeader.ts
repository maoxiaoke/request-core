// FIXME: 这里要仔细斟酌下具体的名称

import type { Middleware } from '../types';

const jsonHeaderHandler: Middleware = (next) => async (req) => {
  const { headers } = req;
  // FIXME: 这里会默认添加一个 Content-Type 吗
  headers.delete('Content-Type');
  headers.append('Content-type', 'application/json; charset=UTF-8');

  return await next(req);
};

export {
  jsonHeaderHandler,
};
