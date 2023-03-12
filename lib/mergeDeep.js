"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDeep = void 0;
const isObject = item => {
    return item && typeof item === 'object' && !Array.isArray(item);
};
const mergeDeep = (target, ...sources) => {
    if (!sources.length)
        return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key])
                    Object.assign(target, { [key]: {} });
                (0, exports.mergeDeep)(target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return (0, exports.mergeDeep)(target, ...sources);
};
exports.mergeDeep = mergeDeep;
//# sourceMappingURL=mergeDeep.js.map