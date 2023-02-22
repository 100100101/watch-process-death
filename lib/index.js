"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/// <reference types="node" />
tslib_1.__exportStar(require("./startProcessDeathWatching"), exports);
tslib_1.__exportStar(require("./watchProcessDeath"), exports);
// process.kill(process.pid, 'SIGUSR2')
// process.kill(process.ppid, 'SIGUSR2')
//# sourceMappingURL=index.js.map