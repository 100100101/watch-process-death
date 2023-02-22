"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallSitesIdFromNames = exports.getCallerCallSite = exports.getCallSites = void 0;
const getCallSites = () => {
    const _prepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => stack;
    const stack = new Error().stack.slice(1);
    Error.prepareStackTrace = _prepareStackTrace;
    return stack;
};
exports.getCallSites = getCallSites;
const getCallerCallSite = ({ depth = 0 } = {}) => {
    const callers = [];
    const callerFileSet = new Set();
    const callSites = (0, exports.getCallSites)();
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
const getCallSitesIdFromNames = () => {
    const callSites = (0, exports.getCallSites)();
    let idFromNames = '';
    let i = 0;
    for (const callSite of callSites) {
        const fileName = callSite.getFileName();
        const idPart = fileName || '';
        idFromNames += `${i} ${idPart}\n`;
        i++;
    }
    return idFromNames;
};
exports.getCallSitesIdFromNames = getCallSitesIdFromNames;
//# sourceMappingURL=callSites.js.map