"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const helper_1 = require("./config/helper");
const port = helper_1.default.normalizePort(process.env.PORT || 4000);
app_1.default.listen(port, () => {
    console.log(`success running at port ${port}`);
});

//# sourceMappingURL=maps/index.js.map
