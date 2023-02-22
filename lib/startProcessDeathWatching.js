"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startProcessDeathWatching = void 0;
const processEventHandler_1 = require("./processEventHandler");
const constants_1 = require("./constants");
// import { awaitAllGlobalCallbacks } from './awaitAllGlobalCallbacks'
const startProcessDeathWatching = (options = {}) => {
    let globalCallbacks = globalThis[constants_1.GLOBAL_CALLBACKS_PROP_NAME];
    if (!globalCallbacks) {
        globalCallbacks = {};
        globalThis[constants_1.GLOBAL_CALLBACKS_PROP_NAME] = globalCallbacks;
        const originalProcessExit = process.exit;
        process.exit = async function (code) {
            // await awaitAllGlobalCallbacks('exit', true)
            originalProcessExit(code);
        };
    }
    process.stdin.resume();
    const defaultEventsOptions = {
        // do something when app is closing
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
    const eventsOptions = Object.assign(defaultEventsOptions, options);
    for (const eventEntry of Object.entries(eventsOptions)) {
        const [eventName, eventOptions] = eventEntry;
        const { withExit } = eventOptions;
        const bindedProcessEventHandler = processEventHandler_1.processEventHandler.bind(null, {
            eventName,
            withExit,
        });
        process.on(eventName, bindedProcessEventHandler);
    }
};
exports.startProcessDeathWatching = startProcessDeathWatching;
// process.kill(process.pid, 'SIGUSR2')
// process.kill(process.ppid, 'SIGUSR2')
//# sourceMappingURL=startProcessDeathWatching.js.map