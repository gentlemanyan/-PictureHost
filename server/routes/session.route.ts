import * as Router from 'koa-router';
import session from '../controllers/session.controller';

const router = new Router();

router.prefix('/session');

//创建会话（登录）
router.post('/', session.create);
//删除会话（退出登录）
router.delete('/', session.delete);

export default router;
