import type { Middleware } from '../types';

const authHandler: Middleware = (next) => async (req) => {
  const { url } = req;
  const response = await next(req);

  const { status } = response;

  if (status === 401) {
    const { code, properties } = await response.json() ?? {};
    if (code === 'error.moveTemporarily' && properties?.location) {
      const decodedLocation = decodeURIComponent(decodeURIComponent(properties.location));

      const matches = decodedLocation.match(/\?redirect=(.*)/);

      if (matches && matches[1]) {
        // FIXME: 这里搞一个 case 就好了
        if (url.includes('urbanic-app')) {
          window.open(decodedLocation.replace(matches[0], ''), '_blank');
        } else {
          const redirectLocation = decodedLocation.replace(matches[1], encodeURIComponent(location.href));
          window.location.href = redirectLocation;
        }
      }
    }
  }


  return response;
};

export {
  authHandler,
};
