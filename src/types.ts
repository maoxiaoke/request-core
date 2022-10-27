export type Next = (request: Req) => Promise<Res>;

export type Middleware = (next: Next) => Next;

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
}

export interface Req extends WriteRequest {
  // Follow the spec of Koa request https://github.com/koajs/koa/blob/master/docs/api/request.md
  url: string;
  /**
   * Override the default request method.
   */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'PATCH';
  /**
   * timeout in ms
   */
  timeout?: number;

  query?: Record<string, string | number | boolean>;

  // FIXME: 这里怎么通过插件的方式提供
  baseUrl?: string;
}

export type Res = Response;
