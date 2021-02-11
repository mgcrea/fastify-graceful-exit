# FastifyGracefulExit

[![npm version](https://img.shields.io/npm/v/@mgcrea/fastify-graceful-exit.svg)](https://github.com/mgcrea/fastify-graceful-exit/releases)
[![license](https://img.shields.io/npm/l/@mgcrea/fastify-graceful-exit)](https://tldrlegal.com/license/mit-license)
[![build status](https://img.shields.io/github/workflow/status/mgcrea/fastify-graceful-exit/ci)](https://github.com/mgcrea/fastify-graceful-exit/actions)
[![dependencies status](https://img.shields.io/david/mgcrea/fastify-graceful-exit)](https://david-dm.org/mgcrea/fastify-graceful-exit)
[![devDependencies status](https://img.shields.io/david/dev/mgcrea/fastify-graceful-exit)](https://david-dm.org/mgcrea/fastify-graceful-exit?type=dev)

Graceful exit for [fastify](https://github.com/fastify/fastify).

- Built with [TypeScript](https://www.typescriptlang.org/) for static type checking with exported types along the
  library.

## Usage

```bash
npm install fastify-cookie @mgcrea/fastify-graceful-exit --save
# or
yarn add fastify-cookie @mgcrea/fastify-graceful-exit
```

You probably want to disable fastify own request logging using the `disableRequestLogging` option.

```ts
import createFastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import fastifyGracefulExit from '@mgcrea/fastify-graceful-exit';

export const buildFastify = (options: FastifyServerOptions = {}): FastifyInstance => {
  const fastify = createFastify({ disableRequestLogging: true, ...options });

  fastify.register(fastifyGracefulExit, { timeout: 3000 });

  return fastify;
};
```

## Authors

- [Olivier Louvignes](https://github.com/mgcrea) <<olivier@mgcrea.io>>

## License

```
The MIT License

Copyright (c) 2020 Olivier Louvignes <olivier@mgcrea.io>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
