# request-core

`request-core` 是一个基于洋葱模型的，支持中间件的底层库。`request-core` 并不是直接给项目提供的 Http Client，而是为了方便开发者开发自己的请求库。

基于 request-core，你可以很方便地为自己的公司、或项目开发一套统一的请求库。

## Axios is good enough, but not enough

公司内部往往有很多项目，每个项目都有自己的 Http Client，这些请求库的代码大同小异，但是又有一些细微的差别。比如有的项目使用了 axios，有的项目使用了 fetch，有的项目使用了自己封装的请求库。请求库的混乱是阻碍团队协作的，随着公司前端工程的规范化、一致化，就会产生统一请求库的诉求。

但面临实际场景，完全统一的请求库是无法满足不同业务、不同项目的诉求的。如果强行进行统一，只会造成请求库的臃肿和难以使用。

举个实际的例子，错误的统一管控是一个常见的诉求。工程上希望对请求进行统一的错误拦截，当接口报错时，可以对用户进行提示。对于 toB 的业务，可能会采用 [antd](https://ant.design/index-cn/) 的 [Message 组件](https://ant.design/components/message-cn) 来进行提示；而对于无线端业务，有可能会使用到 [antd-mobile](https://mobile.ant.design/index-cn/) 的 [toast](https://mobile.ant.design/zh/components/toast)。这就是由于不同类型业务（PC 业务和无线端业务）导致请求库在处理相同问题时所带来的差异。

`request-core` 的出现就是为了解决这个问题。`request-core` 提供了一个基于洋葱模型的请求库，你可以通过中间件的方式来扩展它，从而满足不同的业务需求。

```ts
// 这个例子展示使用 request-core 轻易地创建一个项目的请求库

// 引入公用的 baseUrlHandler 中间件
import { Core, Req, Response, baseUrlHandler } from '@nzha/request-core';

import { errorHandlerUsingAntd } from './errorHandlerUsingAntd';
import { errorHandlerUsingAntdMobile } from './errorHandlerUsingAntdMobile';

const toBRequest = new Core<Req>();
toBRequest.use(baseUrlHandler(), errorHandlerUsingAntd);

const mobileRequest = new Core<Req>();
mobileRequest.use(baseUrlHandler(), errorHandlerUsingAntdMobile);
```

从上面的例子可以认识到，相比于之前各个项目、各个业务相互为政。`request-core` 通过统一和规范，来分化出针对不同项目和业务的请求能力。对于请求库的开发者，只需要进行中间件的开发，然后针对不同业务、项目进行中间件编排；对于请求库的消费者而言，使用方式基本完全一致：

```js
// 这个例子展示请求库在项目中的使用

import { myOwnHttpClient } from 'my-own-http-client';

myOwnHttpClient.get('https://api.github.com/user');
```

## How to use

安装 request-core：

```bash
pnpm add @nzha/request-core
# or
npm i @nzha/request-core
```

`request-core` 的 api 非常少，创建你自己的请求库只需要以下以下几行代码：

```ts
import { Core, baseUrlHandler } from 'request-core';
import { Req } from 'request-core';

interface ExtendReq extends Req {
  // 你可以在这里扩展 Req 的类型，比如增加一些自定义参数
  baseUrl?: string;
}

const xxxReqeust = new Core<ExtendReq>();

xxxReqeust.use(baseUrlHandler);

export {
  xxxReqeust,
}
```

## 中间件

`request-core` 是核心是中间件。中间件是一个函数，它接受一个 `Req` 对象，返回一个 `Res` 对象。中间件的执行顺序是从左到右。

下面是自定义一个 `request-core` 中间件的例子。

```ts
import { Middleware } from 'request-core';

const myMiddleware: Middleware = (next) => async (req) => {
  // Do Something to change req params
  const response = await next(req);

  // Do Something to change response
  return response;
};

export {
  myMiddleware,
};
```

## 内置中间件

`request-core` 内置一些基础的中间件，帮助请求库开发者更简单地开发自己的请求库。

### baseUrlHandler

`baseUrlHandler` 可以在请求时自动拼接 baseUrl。

```ts
// 使用示例
import { baseUrlHandler, Core } from '@nzha/request-core';

const myOwnRequest = new Core();
myOwnRequest.use(baseUrlHandler('https://api.github.com'));
```

当用户调用 `myOwnRequest.get('/user')` 时，实际上会发起 `https://api.github.com/user` 的请求。

### jsonResponseHandler

`jsonResponseHandler` 会自动将响应体转换为 json 对象。


### queryHandler

`queryHandler` 可以在请求时自动拼接 query 参数。可以将 query 参数传递为对象或者字符串。

```ts
// 使用示例
import { queryHandler, Core } from '@nzha/request-core';

const myOwnRequest = new Core();
myOwnRequest.use(queryHandler());

// 使用
myOwnRequest.get('/user', {
  query: {
    name: 'nzha',
  },
});
```
