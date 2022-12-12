import { message } from 'antd';
import type { Middleware } from '@ub/request-core';
import type { ExtendReq } from '../index';

const errorHandler: Middleware<ExtendReq> = (next) => async (req) => {
  // FIXME: suppressError 适合放在 req 参数中吗，放在 response 是不是更合适
  const { suppressError } = req;
  const response = await next(req);

  const { status } = response;

  if (status === 500 || status === 400) {
    const { message: errMsg = 'Internal Server Error. Try it later!' } = await response?.json() ?? {};
    !suppressError && message.error(errMsg);
    throw new Error(errMsg);
  }

  if (status === 404) {
    const errMsg = `${req.url} is not found!`;
    !suppressError && message.error(errMsg);

    throw new Error(errMsg)
  }

  return response;
};

export {
  errorHandler,
};
