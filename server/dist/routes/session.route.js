"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const session_controller_1 = require("../controllers/session.controller");
const router = new Router();
router.prefix('/session');
router.post('/', session_controller_1.default.create);
router.delete('/', session_controller_1.default.delete);
exports.default = router;

//# sourceMappingURL=../maps/routes/session.route.js.map
