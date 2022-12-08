import { message } from 'antd';
import type { Middleware } from '../types';

const errorHandler: Middleware = (next) => async (req) => {
  const response = await next(req);

  const { status } = response;

  if (status === 500 || status === 400) {
    const { message: errMsg = 'Internal Server Error. Try it later!' } = await response.json() ?? {};
    message.error(errMsg);
    throw new Error(errMsg);
  }

  return response;
};

export {
  errorHandler,
};
