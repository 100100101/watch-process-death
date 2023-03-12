import getGlobalWatchProcessDeath from './getGlobalWatchProcessDeath';
import { TGlobalCallbacks, TStartProcessDeathWatchingOptions, TGlobalWatchProcessDeath } from './types';
export declare class WatchProcessDeath {
    private startProcessDeathWatching;
    addMiddleware: import("./types").TAddMiddleware;
    getGlobalWatchProcessDeath: typeof getGlobalWatchProcessDeath;
    aggregateAndCallCallbacks: (this: WatchProcessDeath, eventName: "exit" | "SIGINT" | "SIGUSR1" | "SIGUSR2" | "uncaughtException", withExit: boolean) => Promise<void>;
    readonly defaultOptions: TStartProcessDeathWatchingOptions;
    options: TStartProcessDeathWatchingOptions;
    globalCallbackRecords: TGlobalCallbacks;
    globalWatchProcessDeath: TGlobalWatchProcessDeath;
    constructor(options?: Partial<TStartProcessDeathWatchingOptions> | undefined);
}
