import * as Router from 'koa-router';
import * as passport from 'koa-passport';
import * as crypto from 'crypto';

import {user} from '../controllers/user.controller';

const router = new Router();

router.prefix('/user');

// create acount
router.post('/', user.create);
// get user
router.get('/:account', user.get);
// update user
router.put('/:account', user.update);
// delete user
router.delete('/:account', user.delete);

export default router;
