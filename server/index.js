const express = require('express');
const compression = require('compression');
const { parse } = require('url');
const next = require('next');
const { join } = require('path');
const routes = require('../routes');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const sslRedirect = require('heroku-ssl-redirect');

const handle = routes.getRequestHandler(app, ({ req, res, route }) => {
  app.render(req, res, route.page);
});

app.prepare().then(() => {
  const server = express();
  server.use(compression());
  server.use(sslRedirect());
  server.use((req, res) => {
    const parsedUrl = parse(req.url, true);
    const rootStaticFiles = [
      '/robots.txt',
      '/sitemap.xml',
      '/OneSignalSDKUpdaterWorker.js',
      '/OneSignalSDKWorker.js',
      '/manifest.json'
    ];
    if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
      const path = join(__dirname, '../static', parsedUrl.pathname);
      app.serveStatic(req, res, path);
    } else {
      handle(req, res, parsedUrl);
    }
  });
  server.use(handle);
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
