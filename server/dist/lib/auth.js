"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const crypto = require("crypto");
function saltHash(data) {
    const salt = crypto.randomBytes(config_1.default.crypto.hash.length).toString('base64');
    return crypto.pbkdf2Sync(data, salt, 1, config_1.default.crypto.hash.length, 'sha1').toString();
}
exports.saltHash = saltHash;

//# sourceMappingURL=../maps/lib/auth.js.map
