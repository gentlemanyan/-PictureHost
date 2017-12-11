import * as Router from 'koa-router';

import users from './user.route';
import session from './session.route';

const router = new Router();

router.get('/', async (ctx, next) => {
  await ctx.render('index', {});
});

router.get('/home', async (ctx, next) => {
  await ctx.render('home', {});
});

router.use(users.routes());
router.use(session.routes());

export default router;
