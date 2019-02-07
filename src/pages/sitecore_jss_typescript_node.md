---
title: Render Sitecore 9.1 JSS site using separate node server
date: '2019-02-07'
spoiler: Use a custom Node based server to render Sitecore 9.1 JSS pages.
---

In a [previous post](/sitecore_jss_typescript) I described how to use TypeScript in
building JSS components. In this post I use the results of this connected **hello-jss-typescript**
JSS app to build a custom Node express web server that consumes the layout service to render
pages. This process is described by Sitecore in the documentation  [Headless SSR via sitecore-jss-proxy](https://jss.sitecore.com/docs/techniques/ssr/headless-mode-ssr#headless-ssr-via-sitecore-jss-proxy).
I took the sample [node-headless-ssr-proxy](https://github.com/Sitecore/jss/tree/dev/samples/node-headless-ssr-proxy) and worked from there.

I placed the code in a folder `hello-jss-typescript-node` next to the folder `hello-jss-typescript`
as described in my post [Developing React components in Typescript with Sitecore JSS 9.1](/sitecore_jss_typescript).

The example provides an Express web server that I modified slightly for easy
experimentation. It is great that all configuration is done through environment variables, but for development it is easier to use another
approach. I added dotenv using `npm install dotenv` and added at the
top of `index.js` the code:

```javascript
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
```
This enables us to add a file `.env` in the root to manage the required
environment variables:

```
SITECORE_JSS_APP_NAME=hello-jss-typescript
SITECORE_JSS_SERVER_BUNDLE=../hello-jss-typescript/build/server.bundle.js
SITECORE_API_HOST=http://hello-jss-typescript.dev.local
SITECORE_LAYOUT_SERVICE_ROUTE=http://hello-jss-typescript.dev.local/sitecore/api/layout/render/jss
SITECORE_API_KEY{57231674-4CC9-48AA-AFF0-190DB9D68FE1}
SITECORE_PATH_REWRITE_EXCLUDE_ROUTES=
SITECORE_ENABLE_DEBUG=true
```

I also modified the `index.js` file slightly to work together with the
`hello-jss-typescript` project:

```javascript
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const compression = require('compression');
const scProxy = require('@sitecore-jss/sitecore-jss-proxy').default;
const config = require('./config');

const server = express();
const port = process.env.PORT || 3000;

// enable gzip compression for appropriate file types
server.use(compression());

// turn off x-powered-by http header
server.settings['x-powered-by'] = false;

// Serve static app assets from local /dist folder
server.use(
  '/dist/hello-jss-typescript/',
  express.static('../hello-jss-typescript/build', {
    fallthrough: false, // force 404 for unknown assets under /disthello-jss-typescript/
  })
);

// For any other requests, we render app routes server-side and return them
server.use('*', scProxy(config.serverBundle.renderView, config, config.serverBundle.parseRouteUrl));

server.listen(port, () => {
  console.log(`server listening on port ${port}!`);
});
```

Execute `npm start` and voila, the site is running on `http://localhost:3000`, completely separate from the Sitecore server.

Note that the `.vscode` folder contains a `launch.json` configured to debug the Node code in Visual Studio Code.

The complete example can be found at https://github.com/macaw-interactive/hello-jss-sitecore-node.