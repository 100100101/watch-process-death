"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchProcessDeath = void 0;
const tslib_1 = require("tslib");
/// <reference types="node" />
const awaitAllGlobalCallbacks_1 = require("./awaitAllGlobalCallbacks");
const startProcessDeathWatching_1 = require("./startProcessDeathWatching");
const getGlobalCallbacks_1 = tslib_1.__importDefault(require("./getGlobalCallbacks"));
const addMiddleware_1 = require("./addMiddleware");
const processEventHandler_1 = require("./processEventHandler");
const constants_1 = require("./constants");
// process.kill(process.pid, 'SIGUSR2')
// process.kill(process.ppid, 'SIGUSR2')
class WatchProcessDeath {
    addMiddleware = addMiddleware_1.addMiddleware;
    startProcessDeathWatching = startProcessDeathWatching_1.startProcessDeathWatching;
    awaitAllGlobalCallbacks = awaitAllGlobalCallbacks_1.awaitAllGlobalCallbacks;
    getGlobalCallbacks = getGlobalCallbacks_1.default;
    processEventHandler = processEventHandler_1.processEventHandler;
    defaultEventsOptions = {
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
    };
    options = null;
    globalCallbacks = null;
    constructor(options) {
        const isModuleInitiatedPrevious = !!globalThis[constants_1.GLOBAL_CALLBACKS_PROP_NAME];
        this.options = {
            ...this.defaultEventsOptions,
            ...options,
        };
        if (!isModuleInitiatedPrevious) {
            this.startProcessDeathWatching();
        }
        this.globalCallbacks = (0, getGlobalCallbacks_1.default)();
    }
}
exports.WatchProcessDeath = WatchProcessDeath;
//# sourceMappingURL=index.js.map