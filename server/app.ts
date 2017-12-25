import * as Koa from 'koa';
import * as views from 'koa-views';
import * as json from 'koa-json';
import * as onerror from 'koa-onerror';
import * as bodyparser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as serve from 'koa-static';
import * as session from 'koa-session';
import * as path from 'path';
// import * as mongoose from 'mongoose';
import mongoose = require('mongoose');
import config from './config/config';
import index from './routes/index.route';

import * as uniqValidator from 'mongoose-beautiful-unique-validation';
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoose.uri, config.mongoose.options);
mongoose.plugin(uniqValidator);

const app = new Koa();

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
}));
app.use(session({signed: false, maxAge: 60 * 60 * 1000}, app));
app.use(json());
app.use(logger());
app.use(serve(path.resolve(__dirname, '../../dist')));
app.use(views(path.resolve(__dirname, '../../dist'), {
  map: {
    html: 'swig',
  },
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date().getTime();
  await next();
  const end = new Date().getTime();
  const ms = end - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  ctx.set('X-Response-Time', `${ms}ms`); 
});

// routes
app.use(index.routes()); // index.allowedMethods()

// error-handling
app.on('error', (err, ctx) => {
  console.log('发现错误:', err);
  ctx.status = 500;
  ctx.body = err._message;
});

export default app;
