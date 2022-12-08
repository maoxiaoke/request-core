import type { Middleware } from '../types';
import type { ExtendReq, ExtendRes } from '../index';

const baseUrlHandler: Middleware<ExtendReq, ExtendRes> = (next) => async (req) => {
  const { url, baseUrl } = req;

  if (!url.startsWith('http') && baseUrl) {
    req.url = baseUrl + url;
  }

  return await next(req);
};

export {
  baseUrlHandler,
};
