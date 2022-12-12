import { Core, corsHandler, baseUrlHandler, jsonHeaderHandler, jsonResponseHandler, queryHandler } from '@ub/request-core';
import { errorHandler, authHandler } from './middlewares';
import type { Req, Res } from '@ub/request-core';

export interface ExtendReq extends  Req {
  /**
   * provide simple query function to add query string to url
   */
  query?: Record<string, string | number | boolean | any>;

  /**
   * enable to set baseUrl for all request
   */
  baseUrl?: string;

  /**
  * the ability to suppress error in single request
   */
  suppressError?: boolean;
}

export type ExtendRes = Res;

const uxpRequest = new Core<ExtendReq>();

/*
* 洋葱结构为
* corsHandler -> baseUrlHandler -> queryHandler -> jsonHeaderHandler -> jsonResponseHandler -> errorHandler -> authHandler
*  -> fetch
*   -> authHandler -> errorHandler -> jsonResponseHandler -> jsonHeaderHandler -> queryHandler -> baseUrlHandler -> corsHandler
 */
uxpRequest.use([
  corsHandler(),
  baseUrlHandler({
    baseUrl: 'https://starlink-api-daily.mayfair-inc.com',
  }),
  queryHandler(),
  jsonHeaderHandler(),
  jsonResponseHandler(),
  errorHandler,
  authHandler,
]);

export { uxpRequest };