"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor() { }
    async create(ctx) {
        const reqObj = {
            account: ctx.request.body.account,
            password: ctx.request.body.password,
            username: ctx.request.body.username,
            email: ctx.request.body.email,
        };
    }
    async get(ctx) {
    }
    async update(ctx) {
    }
    async delete(ctx) {
    }
}
exports.user = new UserController();

//# sourceMappingURL=../maps/controllers/user.controller.js.map
