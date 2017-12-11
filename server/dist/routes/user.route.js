"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const user_controller_1 = require("../controllers/user.controller");
const router = new Router();
router.prefix('/user');
router.post('/', user_controller_1.user.create);
router.get('/:account', user_controller_1.user.get);
router.put('/:account', user_controller_1.user.update);
router.delete('/:account', user_controller_1.user.delete);
exports.default = router;

//# sourceMappingURL=../maps/routes/user.route.js.map
