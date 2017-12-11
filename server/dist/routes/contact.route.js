"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const contact_controller_1 = require("../controllers/contact.controller");
const router = new Router();
router.prefix('/contact');
router.get('/:name', contact_controller_1.default.select);
router.post('/', contact_controller_1.default.create);
router.delete('/:name', contact_controller_1.default.delete);
exports.default = router;

//# sourceMappingURL=../maps/routes/contact.route.js.map
