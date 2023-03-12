"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventNames = exports.CEventNames = void 0;
// export enum EEventNames {
//     EXIT = 'exit',
//     SIGINT = 'SIGINT',
//     SIGUSR1 = 'SIGUSR1',
//     SIGUSR2 = 'SIGUSR2',
//     UNCAUGHT_EXCEPTION = 'uncaughtException',
// }
exports.CEventNames = {
    EXIT: 'exit',
    SIGINT: 'SIGINT',
    SIGUSR1: 'SIGUSR1',
    SIGUSR2: 'SIGUSR2',
    UNCAUGHT_EXCEPTION: 'uncaughtException',
};
exports.eventNames = Object.values(exports.CEventNames);
//# sourceMappingURL=index.js.map