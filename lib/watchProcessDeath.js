"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchProcessDeath = void 0;
const constants_1 = require("./constants");
const startProcessDeathWatching_1 = require("./startProcessDeathWatching");
const callSites_1 = require("./callSites");
const watchProcessDeath = callback => {
    const callSitesIdFromNames = (0, callSites_1.getCallSitesIdFromNames)();
    let globalCallbacks = globalThis[constants_1.GLOBAL_CALLBACKS_PROP_NAME];
    if (!globalCallbacks) {
        (0, startProcessDeathWatching_1.startProcessDeathWatching)();
        globalCallbacks = globalThis[constants_1.GLOBAL_CALLBACKS_PROP_NAME];
    }
    globalCallbacks[callSitesIdFromNames] = callback;
};
exports.watchProcessDeath = watchProcessDeath;
//# sourceMappingURL=watchProcessDeath.js.map