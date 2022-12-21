import type {  Req, Next, Res, Middleware } from '../types';

interface BaseUrlMiddlewareReq extends Req {
  // This means that baseUrl can be modified by a single request
  baseUrl?: string;
}

interface BaseurlMiddlewareOption {
  baseUrl: string | ((req: Req) => string);
}

// This snippet is copied from https://github.com/jfromaniello/url-join/blob/main/lib/url-join.js under MIT license
const urlJoin = (strArray: string[]) => {
  const resultArray = [];
  if (strArray.length === 0) { return ''; }

  if (typeof strArray[0] !== 'string') {
    throw new TypeError('Url must be a string. Received ' + strArray[0]);
  }

  // If the first part is a plain protocol, we combine it with the next part.
  if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1) {
    strArray[0] = strArray.shift() + strArray[0];
  }

  // There must be two or three slashes in the file protocol, two slashes in anything else.
  if (strArray[0].match(/^file:\/\/\//)) {
    strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1:///');
  } else {
    strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1://');
  }

  for (let i = 0; i < strArray.length; i++) {
    let component = strArray[i];

    if (typeof component !== 'string') {
      throw new TypeError('Url must be a string. Received ' + component);
    }

    if (component === '') { continue; }

    if (i > 0) {
      // Removing the starting slashes for each component but the first.
      component = component.replace(/^[\/]+/, '');
    }
    if (i < strArray.length - 1) {
      // Removing the ending slashes for each component but the last.
      component = component.replace(/[\/]+$/, '');
    } else {
      // For the last component we will combine multiple slashes to a single one.
      component = component.replace(/[\/]+$/, '/');
    }

    resultArray.push(component);

  }

  let str = resultArray.join('/');
  // Each input component is now separated by a single slash except the possible first plain protocol part.

  // remove trailing slash before parameters or hash
  str = str.replace(/\/(\?|&|#[^!])/g, '$1');

  // replace ? in parameters with &
  const parts = str.split('?');
  str = parts.shift() + (parts.length > 0 ? '?': '') + parts.join('&');

  return str;
}

const baseUrlHandler = <T extends BaseUrlMiddlewareReq> (option: BaseurlMiddlewareOption): Middleware<T> => (next) => async (req) => {
  const { baseUrl } = option;
  const { url, baseUrl: customUrl } = req;

  const _baseUrl = customUrl ?? baseUrl;

  if (!url.startsWith('http') && _baseUrl) {
    if (typeof _baseUrl === 'function') {
      req.url = _baseUrl(req);
    } else {
      req.url = urlJoin([_baseUrl, url]);
    }
  }

  return await next(req);
};

export {
  baseUrlHandler,
};
