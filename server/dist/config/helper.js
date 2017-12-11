"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
exports.default = { normalizePort };

//# sourceMappingURL=../maps/config/helper.js.map
