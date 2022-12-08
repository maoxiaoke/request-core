import type { Middleware } from '@ub/request-core';

const authHandler: Middleware = (next) => async (req) => {
  const { url } = req;
  const response = await next(req);

  const { status } = response;

  if (status === 401) {
    const { code, properties } = await response.json() ?? {};
    if (code === 'error.moveTemporarily' && properties?.location) {
      const decodedLocation = decodeURIComponent(decodeURIComponent(properties.location));

      console.log('----ub-request----完全 decode 的 location', decodedLocation);

      const openBlankWindow = !url.includes('currentUser');

      const matchesOfRedirect = decodedLocation.match(/\?redirect=(.*)/);

      const redirectUrl = matchesOfRedirect?.[1];

      const encodeRedirectLocation = openBlankWindow
        ? decodedLocation.replace(matchesOfRedirect?.[0] ?? '', '')
        : decodedLocation.replace(redirectUrl, encodeURIComponent(location.href));


      console.log('----ub-request----第一次 encode 的 url', encodeRedirectLocation);

      const matchesOfService = encodeRedirectLocation.match(/\?service=(.*)/);

      const serviceUrl = matchesOfService?.[1];

      console.log('fsfdsfsf', serviceUrl);

      const fullyEncodedUrl = encodeRedirectLocation.replace(serviceUrl, encodeURIComponent(serviceUrl));

      console.log('----ub-request----第二次 encode 的 url', fullyEncodedUrl);


      if (openBlankWindow) {
        window.open(encodeRedirectLocation, '_blank');
      } else {
        window.location.href = fullyEncodedUrl;
      }
    }
  }


  return response;
};

export {
  authHandler,
};
