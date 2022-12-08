export type Next<T extends Req = Req, U extends Res = Res> = (request: T) => Promise<U>;

export type Middleware<T extends Req = Req, U extends Res = Res> = (next: Next<T, U>) => Next<T, U>;

export type MiddlewareWithOption<O, T extends Req = Req, U extends Res = Res> = (option: O) => Middleware<T, U>;

/**
 * Make request is writable
 */
export interface WriteRequest {
  cache: RequestCache;
  credentials: RequestCredentials;
  destination: RequestDestination;
  headers: Headers;
  integrity: string;
  keepalive: boolean;
  method: string;
  mode: RequestMode;
  redirect: RequestRedirect;
  referrer: string;
  referrerPolicy: ReferrerPolicy;
  signal: AbortSignal;
  url: string;
  body: BodyInit;
}

export interface Req extends WriteRequest {
  // Follow the spec of Koa request https://github.com/koajs/koa/blob/master/docs/api/request.md
  url: string;
  /**
   * Override the default request method.
   */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'PATCH';
  /**
   * timeout in ms, not implemented yet
   */
  timeout?: number;

}

export type Res = Response;
