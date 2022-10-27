import type { Middleware } from '../types';

const baseUrlHandler: Middleware = (next) => async (req) => {
  const { url, baseUrl } = req;

  // FIXME: 这里代码写详细点
  if (!url.startsWith('http') && baseUrl) {
    req.url = baseUrl + url;
  }

  return await next(req);
};

export {
  baseUrlHandler,
};
