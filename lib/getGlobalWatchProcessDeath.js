"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
function default_1() {
    let globalWatchProcessDeath = globalThis[constants_1.GLOBAL_WATCH_PROCESS_DEATH_PROP_NAME];
    if (globalWatchProcessDeath) {
        return globalWatchProcessDeath;
    }
    globalWatchProcessDeath = {
        callbackRecords: {},
        callbacksAggregatePending: null,
    };
    globalThis[constants_1.GLOBAL_WATCH_PROCESS_DEATH_PROP_NAME] = globalWatchProcessDeath;
    return globalWatchProcessDeath;
}
exports.default = default_1;
//# sourceMappingURL=getGlobalWatchProcessDeath.js.map