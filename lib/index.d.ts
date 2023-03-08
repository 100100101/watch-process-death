import { awaitAllGlobalCallbacks } from './awaitAllGlobalCallbacks';
import getGlobalCallbacks from './getGlobalCallbacks';
import { TGlobalCallbacks, TStartProcessDeathWatchingOptions, TStartProcessDeathWatchingDefaultOptions } from '../types';
export declare class WatchProcessDeath {
    addMiddleware: import("../types").TAddMiddleware;
    private startProcessDeathWatching;
    awaitAllGlobalCallbacks: typeof awaitAllGlobalCallbacks;
    getGlobalCallbacks: typeof getGlobalCallbacks;
    processEventHandler: import("../types").TProcessEventHandler;
    readonly defaultEventsOptions: TStartProcessDeathWatchingDefaultOptions;
    options: TStartProcessDeathWatchingOptions;
    globalCallbacks: TGlobalCallbacks;
    constructor(options: TStartProcessDeathWatchingOptions);
}
