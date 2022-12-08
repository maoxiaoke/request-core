import Core from './core/index';
import { corsHandler, jsonResponseHandler, baseUrlHandler, authHandler, errorHandler, jsonHeaderHandler } from './builtin';

import type { Req, Res } from './types';

export interface ExtendReq extends Req {
  /**
   * provide simple query function to add query string to url
   */
  query?: Record<string, string | number | boolean>;

  /**
   * enable to set baseUrl for all request
   */
  baseUrl?: string;
}

export type ExtendRes = Res;


const uxpRequest = new Core<ExtendReq, ExtendRes>();

uxpRequest.use([corsHandler, baseUrlHandler, jsonHeaderHandler, jsonResponseHandler, errorHandler, authHandler]);

export { uxpRequest };

export {
  Core,
};

export type { Next, Middleware } from './types';

