"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregateAndCallCallbacks = void 0;
const tslib_1 = require("tslib");
const promises_1 = tslib_1.__importDefault(require("node:fs/promises"));
const callAllCallbacks = async function (eventName, withExit) {
    const globalCallbackRecords = this.globalCallbackRecords;
    if (globalCallbackRecords === null)
        return;
    const globalCallbackRecordEntries = Object.entries(globalCallbackRecords);
    for (const [idFromStackTrace, callbackRecord,] of globalCallbackRecordEntries) {
        const { filePath, lineNumber, callback } = callbackRecord;
        try {
            await promises_1.default.access(filePath);
        }
        catch {
            delete globalCallbackRecords[idFromStackTrace];
            continue;
        }
        console.log(`\x1b[46m\x1b[30mCalled process death handler from\n${filePath}:${lineNumber}\x1b[0m`);
        await callback(eventName, withExit);
    }
};
const aggregateAndCallCallbacks = async function (eventName, withExit) {
    const globalCallbackRecords = this.globalCallbackRecords;
    if (globalCallbackRecords === null)
        return;
    const globalWatchProcessDeath = this.globalWatchProcessDeath;
    if (!globalWatchProcessDeath)
        return;
    const { callbacksAggregatePending } = globalWatchProcessDeath;
    if (!callbacksAggregatePending) {
        const { callbacksAggregatePendingMs } = this.options;
        const callbacksAggregatePending = new Promise(resolve => setTimeout(resolve, callbacksAggregatePendingMs));
        globalWatchProcessDeath.callbacksAggregatePending =
            callbacksAggregatePending;
        callbacksAggregatePending.then(async () => {
            globalWatchProcessDeath.callbacksAggregatePending = null;
            await callAllCallbacks.call(this, eventName, withExit);
            if (!withExit)
                return;
            process.exit();
        });
    }
};
exports.aggregateAndCallCallbacks = aggregateAndCallCallbacks;
//# sourceMappingURL=aggregateAndCallCallbacks.js.map