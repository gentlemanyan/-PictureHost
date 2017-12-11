"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const serve = require("koa-static");
const session = require("koa-session");
const path = require("path");
const mongoose = require("mongoose");
const config_1 = require("./config/config");
const index_route_1 = require("./routes/index.route");
const uniqValidator = require("mongoose-beautiful-unique-validation");
mongoose.connect(config_1.default.mongoose.uri, config_1.default.mongoose.options);
mongoose.plugin(uniqValidator);
const app = new Koa();
onerror(app);
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text'],
}));
app.use(session({}, app));
app.use(json());
app.use(logger());
app.use(serve(path.resolve(__dirname, '../../dist')));
app.use(views(path.resolve(__dirname, '../../dist'), {
    map: {
        html: 'swig',
    },
}));
app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const end = new Date().getTime();
    const ms = end - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(index_route_1.default.routes());
app.on('error', (err, ctx) => {
    console.log('server error', err);
    ctx.status = 500;
    ctx.body = err._message;
});
exports.default = app;

//# sourceMappingURL=maps/app.js.map
