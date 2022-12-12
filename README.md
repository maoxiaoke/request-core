# request-core

request-core 是一个基于洋葱模型的，支持中间件的请求库。请注意，request-core 的目的并不是提供给普通开发者直接使用的，而是为了方便开发者开发自己的请求库。

基于 request-core，你可以很方便地为自己的公司、或项目开发一套统一的请求库。

## Motivation

公司内部有很多项目，每个项目都有自己的请求库，这些请求库的代码大同小异，但是又有一些细微的差别。比如有的项目使用了 axios，有的项目使用了 fetch，有的项目使用了自己封装的 request 库。如何通过合适的底层架构来统一这些请求库，又能够满足不同业务、项目的诉求。

request-core 的出现就是为了解决这个问题。request-core 提供了一个基于洋葱模型的请求库，你可以通过中间件的方式来扩展它，从而满足不同的业务需求。

举个简单的例子，错误的统一管控是一个很常见的需求，但是在内部 toB 的业务，可能会采用 [antd](https://ant.design/index-cn/) 组件库；而无线端的业务，可能会使用 [antd-mobile](https://mobile.ant.design/index-cn/) 来进行错误统一拦截。这时候，可以通过中间件的方式进行拓展，来满足业务的不同诉求。

```ts
// 引入公用的 baseUrlHandler 中间件
import { Core, Req, Response, baseUrlHandler } from 'request-core';

import { errorHandlerForAntd } from './errorHandlerForAntd';
import { errorHandlerForAntdMobile } from './errorHandlerForAntdMobile';

const toBRequest = new Core<Req>();
toBRequest.use(baseUrlHandler(), errorHandlerForAntd);

const mobileRequest = new Core<Req>();
mobileRequest.use(baseUrlHandler(), errorHandlerForAntdMobile);
```

## How to use

安装 request-core：

```bash
pnpm add @ub/request-core
# or
npm i @ub/request-core
```

request-core 的 api 非常少，创建你自己的 request 库只需要以下以下几行代码：

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

request-code 是核心是中间件。中间件是一个函数，它接受一个 Req 对象，返回一个 Req 对象。中间件的执行顺序是从左到右。

下面是自定义一个中间件的例子。

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
