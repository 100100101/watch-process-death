"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitAllGlobalCallbacks = void 0;
const constants_1 = require("./constants");
const awaitAllGlobalCallbacks = async (eventName, withExit) => {
    const globalCallbacks = globalThis[constants_1.GLOBAL_CALLBACKS_PROP_NAME];
    const globalCallbacksValues = Object.values(globalCallbacks);
    const callbackPromises = globalCallbacksValues.map(callback => callback(eventName, withExit));
    await Promise.allSettled(callbackPromises);
};
exports.awaitAllGlobalCallbacks = awaitAllGlobalCallbacks;
//# sourceMappingURL=awaitAllGlobalCallbacks.js.map