"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchProcessDeath = void 0;
const tslib_1 = require("tslib");
/// <reference types="node" />
const startProcessDeathWatching_1 = require("./startProcessDeathWatching");
const getGlobalWatchProcessDeath_1 = tslib_1.__importDefault(require("./getGlobalWatchProcessDeath"));
const addMiddleware_1 = require("./addMiddleware");
const constants_1 = require("./constants");
const aggregateAndCallCallbacks_1 = require("./aggregateAndCallCallbacks");
// process.kill(process.pid, 'SIGUSR2')
// process.kill(process.ppid, 'SIGUSR2')
class WatchProcessDeath {
    startProcessDeathWatching = startProcessDeathWatching_1.startProcessDeathWatching;
    addMiddleware = addMiddleware_1.addMiddleware;
    getGlobalWatchProcessDeath = getGlobalWatchProcessDeath_1.default;
    aggregateAndCallCallbacks = aggregateAndCallCallbacks_1.aggregateAndCallCallbacks;
    defaultOptions = {
        events: {
            // app is closing
            exit: {
                withExit: true,
            },
            // catches ctrl+c event
            SIGINT: {
                withExit: true,
            },
            //  catches "kill pid" (for example: nodemon restart)
            SIGUSR1: {
                withExit: true,
            },
            SIGUSR2: {
                withExit: true,
            },
            // catches uncaught exceptions
            uncaughtException: {
                withExit: true,
            },
        },
        callbacksAggregatePendingMs: 1000,
    };
    // options: Partial<TStartProcessDeathWatchingOptions> | null = null
    options = this.defaultOptions;
    globalCallbackRecords = null;
    globalWatchProcessDeath = null;
    constructor(options) {
        const isModuleInitiatedPrevious = !!globalThis[constants_1.GLOBAL_WATCH_PROCESS_DEATH_PROP_NAME];
        const optionsEvents = options?.events;
        const optionsCallbacksAggregatePendingMs = options?.callbacksAggregatePendingMs;
        const defaultOptionsEvents = this.defaultOptions.events;
        const defaultOptionsCallbacksAggregatePendingMs = this.defaultOptions.callbacksAggregatePendingMs;
        this.options = {
            events: {
                ...defaultOptionsEvents,
                ...optionsEvents,
            },
            callbacksAggregatePendingMs: optionsCallbacksAggregatePendingMs ||
                defaultOptionsCallbacksAggregatePendingMs,
        };
        if (!isModuleInitiatedPrevious) {
            this.startProcessDeathWatching();
        }
        this.globalWatchProcessDeath = (0, getGlobalWatchProcessDeath_1.default)();
        const callbackRecords = this.globalWatchProcessDeath?.callbackRecords;
        if (callbackRecords) {
            this.globalCallbackRecords = callbackRecords;
        }
    }
}
exports.WatchProcessDeath = WatchProcessDeath;
//# sourceMappingURL=index.js.map