import * as Router from 'koa-router';
import users from './user.route';
import session from './session.route';
import RenderCtx from '../lib/render.class';

const router = new Router();
const renderCtx = new RenderCtx();

router.get('/', async (ctx, next) => {
  await ctx.render('index', {});
});

router.get('/home', async (ctx, next) => {
  await ctx.render('home', {});
});

router.use(users.routes());
router.use(session.routes());

router.get('/*', async (ctx, next) => {
  await ctx.render('index', {});
});

router.post('/*', async (ctx, next) => {
  renderCtx.renderSuccess(ctx, 400, 'request error', {
    retmsg: '请求错误，没有该功能'
  });
})

export default router;
