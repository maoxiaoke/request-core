import { expect, describe, it, beforeAll, afterAll, afterEach } from 'vitest';
import fetch, { Request } from 'cross-fetch';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Core from '../src/core/index.js';
import uxpRequest from '../src/index.js';

global.fetch = fetch;
global.Request = Request;

const posts = [{
  userId: 1,
  id: 1,
  title: 'first post title',
  body: 'first post body',
}];

const handlers = [
  rest.get('https://api.com/path/to/posts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(posts));
  }),
];

const mockServer = setupServer(...handlers);

const mockMiddleware = (next) => async (req: any) => {
  // const _req = req.replace('https://api.com/path/to/posts', 'https://api.com/path/to/posts2');
  console.log('1', req);
  const res = await next(req);
  console.log('2', res);
  return res;
};

const mockMiddleware2 = (next) => async (req: any) => {
  console.log('3', req);
  console.log('fsfsdf', next);
  const res = await next(req);
  console.log('4', res);
  return res;
};


describe('basic', () => {
  beforeAll(() => {
    mockServer.listen({
      onUnhandledRequest: 'error',
    });
  });

  afterAll(() => {
    mockServer.close();
  });

  afterEach(() => mockServer.resetHandlers());

  it('basic', async () => {
    const core = new Core({});

    core.use([mockMiddleware, mockMiddleware2]);

    const res = await core.request('https://api.com/path/to/posts');

    expect(res.status).toBe(200);
    const json = await res.json();

    expect(json).toEqual(posts);
  });

  // it('uxp', async () => {
  //   const res = await uxpRequest.request('https://api.com/path/to/posts');
  //   expect(res).toEqual(posts);
  // });
});
