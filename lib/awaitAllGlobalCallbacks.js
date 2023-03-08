"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitAllGlobalCallbacks = void 0;
const tslib_1 = require("tslib");
const promises_1 = tslib_1.__importDefault(require("node:fs/promises"));
async function awaitAllGlobalCallbacks(eventName, withExit) {
    const globalCallbacks = this.globalCallbacks;
    if (!globalCallbacks)
        return;
    const globalCallbacksValues = Object.values(globalCallbacks);
    const callbackPromises = [];
    const callbacksInFileEntries = Object.entries(globalCallbacksValues);
    for (const [callbackString, callbackRecord] of callbacksInFileEntries) {
        const { filePath, lineNumber, callback } = callbackRecord;
        try {
            await promises_1.default.access(filePath);
        }
        catch {
            delete globalCallbacksValues[callbackString];
            continue;
        }
        console.log(`\x1b[46m\x1b[30mCalled process death handler from\n${filePath}:${lineNumber}\x1b[0m`);
        const callbackPromise = callback(eventName, withExit);
        callbackPromises.push(callbackPromise);
    }
    await Promise.allSettled(callbackPromises);
}
exports.awaitAllGlobalCallbacks = awaitAllGlobalCallbacks;
//# sourceMappingURL=awaitAllGlobalCallbacks.js.map