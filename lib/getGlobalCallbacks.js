"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
function default_1() {
    let globalCallbacks = globalThis[constants_1.GLOBAL_CALLBACKS_PROP_NAME];
    if (!globalCallbacks) {
        globalCallbacks = {};
        globalThis[constants_1.GLOBAL_CALLBACKS_PROP_NAME] = globalCallbacks;
    }
    return globalCallbacks;
}
exports.default = default_1;
//# sourceMappingURL=getGlobalCallbacks.js.map