"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processEventHandler = void 0;
const awaitAllGlobalCallbacks_1 = require("./awaitAllGlobalCallbacks");
const processEventHandler = async ({ withExit = false, eventName }, errorOrErrorCode) => {
    if (!eventName)
        return;
    const isErrorCode = typeof errorOrErrorCode === 'number';
    const logPart = [
        `%c watch-process-death event: ${eventName}`,
        'background: #111; color: #bada55; font-size: 15px',
        '\n',
        'With process exit:',
        withExit,
    ];
    if (isErrorCode) {
        const isSuccessCode = errorOrErrorCode === 0;
        const message = isSuccessCode ? 'Is success event' : '';
        console.log(...logPart, '\n', 'Message:', message);
    }
    else if (eventName === 'uncaughtException') {
        console.error('"uncaughtException" errorOrErrorCode:', errorOrErrorCode);
        return;
    }
    else {
        console.log(...logPart);
    }
    await (0, awaitAllGlobalCallbacks_1.awaitAllGlobalCallbacks)(eventName);
    if (withExit) {
        process.exit();
    }
};
exports.processEventHandler = processEventHandler;
//# sourceMappingURL=processEventHandler.js.map