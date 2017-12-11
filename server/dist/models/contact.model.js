"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    id: mongoose.Schema.Types.ObjectId,
    avatar: {
        type: String,
    },
    name: {
        type: String,
        required: 'name is required',
    },
    phone: {
        type: String,
        unique: 'This phone already exist',
        required: 'phone is required',
        validate: [
            {
                validator: function checkPhone(value) {
                    return /^1(3|4|5|7|8)\d{9}$/.test(value);
                },
                msg: 'Please add valid phone',
            },
        ],
    },
});
exports.Contacts = mongoose_1.model('Contacts', contactSchema);

//# sourceMappingURL=../maps/models/contact.model.js.map
