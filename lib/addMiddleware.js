"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMiddleware = void 0;
const stackTrace_1 = require("./stackTrace");
const addMiddleware = function (callback) {
    const globalCallbacks = this.globalCallbacks;
    if (globalCallbacks === null)
        return;
    const stackTrace = (0, stackTrace_1.getStackTrace)();
    const idFromStackTrace = (0, stackTrace_1.getIdFromStackTrace)(stackTrace);
    const firstCallSite = stackTrace[1];
    const filePath = firstCallSite.getFileName();
    const lineNumber = firstCallSite.getLineNumber();
    globalCallbacks[idFromStackTrace] = {
        filePath,
        lineNumber,
        callback,
    };
};
exports.addMiddleware = addMiddleware;
//# sourceMappingURL=addMiddleware.js.map