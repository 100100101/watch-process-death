"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startProcessDeathWatching = void 0;
const startProcessDeathWatching = function () {
    const options = this.options;
    if (!options)
        return;
    const originalProcessExit = process.exit;
    process.exit = async function (code) {
        // await awaitAllGlobalCallbacks('exit', true)
        originalProcessExit(code);
    };
    process.stdin.resume();
    const eventsOptionsEntries = Object.entries(options);
    for (const [eventName, eventOptions] of eventsOptionsEntries) {
        let withExit = eventOptions?.withExit;
        if (withExit === undefined) {
            withExit = this.defaultEventsOptions[eventName].withExit;
        }
        const bindedProcessEventHandler = errorCode => {
            return this.processEventHandler({
                eventName,
                withExit,
            }, errorCode);
        };
        process.on(eventName, bindedProcessEventHandler);
    }
};
exports.startProcessDeathWatching = startProcessDeathWatching;
// process.kill(process.pid, 'SIGUSR2')
// process.kill(process.ppid, 'SIGUSR2')
//# sourceMappingURL=startProcessDeathWatching.js.map