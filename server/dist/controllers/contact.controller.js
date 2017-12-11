"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contact_model_1 = require("./../models/contact.model");
class ContactController {
    constructor() { }
    async create(ctx, next) {
        const reqObj = ctx.request.body;
        if (reqObj.avatar === '' || reqObj.avatar == null) {
            ctx.throw('avatar is null');
        }
        if (reqObj.name === '' || reqObj.name == null) {
            ctx.throw('name is null');
        }
        if (reqObj.phone === '' || reqObj.phone == null) {
            ctx.throw('phone is null');
        }
        const contact = new contact_model_1.Contacts({
            avatar: ctx.request.body.avatar,
            name: ctx.request.body.name,
            phone: ctx.request.body.phone,
        });
        const result = contact.save();
        if (result) {
            ctx.status = 200;
            ctx.body = {
                retCode: '0000',
                retMsg: 'add contact success',
            };
        }
        else {
            ctx.status = 500;
            ctx.body = {
                retCode: '0000',
                retMsg: 'add contact fail',
            };
        }
    }
    async select(ctx, next) {
        const reqObj = ctx.params;
        if (reqObj.name === null || reqObj.name === '') {
            ctx.throw('name is null');
        }
        let data;
        if (reqObj.name === 'all') {
            data = await contact_model_1.Contacts.find();
        }
        else {
            data = await contact_model_1.Contacts.find({ name: reqObj.name });
        }
        ctx.status = 200;
        ctx.body = {
            data: data,
            retCode: '0000',
            retMsg: 'search contacts success',
        };
    }
    async delete(ctx, next) {
        const reqObj = ctx.params;
        if (reqObj.name === '' || reqObj.name == null) {
            ctx.throw('name is null');
        }
        const result = await contact_model_1.Contacts.remove({ name: reqObj.name });
        if (result) {
            ctx.status = 200;
            ctx.body = {
                retCode: '0000',
                retMsg: 'delete contact success',
            };
        }
        else {
            ctx.status = 500;
            ctx.body = {
                retCode: '0000',
                retMsg: 'delete contact fail',
            };
        }
    }
    async update(ctx, next) {
    }
}
exports.default = new ContactController();

//# sourceMappingURL=../maps/controllers/contact.controller.js.map
