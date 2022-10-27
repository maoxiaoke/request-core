import Core from './core/index';
import { corsHandler, jsonResponseHandler, baseUrlHandler, authHandler } from './builtin';

const uxpRequest = new Core({});

uxpRequest.use([corsHandler, baseUrlHandler, authHandler, jsonResponseHandler]);

export { uxpRequest };

export {
  Core,
};

export type { Next, Middleware } from './types';

