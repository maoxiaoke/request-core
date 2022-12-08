import { Core, corsHandler, baseUrlHandler, jsonHeaderHandler, jsonResponseHandler } from '@ub/request-core';
import { errorHandler, authHandler } from './middlewares';
import type { Req, Res } from '@ub/request-core';

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

const uxpRequest = new Core<ExtendReq>();

uxpRequest.use([
  corsHandler(),
  baseUrlHandler({
    baseUrl: 'https://starlink-api-daily.mayfair-inc.com/api/v1',
  }),
  jsonHeaderHandler(),
  jsonResponseHandler(),
  errorHandler,
  authHandler,
]);

export { uxpRequest };