"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const user_route_1 = require("./user.route");
const contact_route_1 = require("./contact.route");
const session_route_1 = require("./session.route");
const router = new Router();
router.get('/', async (ctx, next) => {
    await ctx.render('index', {});
});
router.get('/home', async (ctx, next) => {
    await ctx.render('home', {});
});
router.use(user_route_1.default.routes());
router.use(session_route_1.default.routes());
router.use(contact_route_1.default.routes());
exports.default = router;

//# sourceMappingURL=../maps/routes/index.route.js.map
