"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdFromStackTrace = exports.getCallerCallSite = exports.getStackTrace = void 0;
const getStackTrace = () => {
    const _prepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => stack;
    const stack = new Error().stack.slice(1);
    Error.prepareStackTrace = _prepareStackTrace;
    return stack;
};
exports.getStackTrace = getStackTrace;
const getCallerCallSite = ({ depth = 0 } = {}) => {
    const callers = [];
    const callerFileSet = new Set();
    const callSites = (0, exports.getStackTrace)();
    for (const callSite of callSites) {
        const fileName = callSite.getFileName();
        const hasReceiver = callSite.getTypeName() !== null && fileName !== null;
        if (!callerFileSet.has(fileName)) {
            callerFileSet.add(fileName);
            callers.unshift(callSite);
        }
        if (hasReceiver) {
            return callers[depth];
        }
    }
};
exports.getCallerCallSite = getCallerCallSite;
const getIdFromStackTrace = (stackTrace) => {
    let idFromNames = '';
    let i = 0;
    for (const callSite of stackTrace) {
        const fileName = callSite.getFileName();
        const idPart = fileName || '';
        idFromNames += `${i} ${idPart}\n`;
        i++;
    }
    return idFromNames;
};
exports.getIdFromStackTrace = getIdFromStackTrace;
//# sourceMappingURL=stackTrace.js.map