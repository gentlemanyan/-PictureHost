"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
class SessionController {
    constructor() { }
    async create(ctx, next) {
        console.log("输出会话。。。。。");
        const reqObj = ctx.request.body;
        if (reqObj.username === null || reqObj.username === '') {
            ctx.throw('用户账户不能为空!');
        }
        if (reqObj.password === null || reqObj.password === '') {
            ctx.throw('请输入密码');
        }
        console.log(reqObj.username);
        console.log(reqObj.password);
        const user = await user_model_1.User.findOne({ username: reqObj.username, password: reqObj.password });
        if (user) {
            ctx.cookies.set('username', reqObj.username);
            ctx.cookies.set('password', reqObj.password);
            ctx.status = 200;
            ctx.body = {
                data: user,
                retmsg: 'login success',
            };
        }
        else {
            ctx.status = 404;
            ctx.body = {
                retmsg: '登录失败，请检查账户和密码是否正确',
            };
        }
    }
    async delete(ctx, next) {
    }
}
exports.default = new SessionController();

//# sourceMappingURL=../maps/controllers/session.controller.js.map
