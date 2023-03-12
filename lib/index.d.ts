import getGlobalWatchProcessDeath from './getGlobalWatchProcessDeath';
import { TGlobalCallbacks, TWatchProcessDeathOptions, TGlobalWatchProcessDeath, TWatchProcessDeathUserOptions } from './types';
export declare class WatchProcessDeath {
    private startProcessDeathWatching;
    addMiddleware: import("./types").TAddMiddleware;
    getGlobalWatchProcessDeath: typeof getGlobalWatchProcessDeath;
    aggregateAndCallCallbacks: (this: WatchProcessDeath, eventName: "exit" | "SIGINT" | "SIGUSR1" | "SIGUSR2" | "uncaughtException", withExit: boolean) => Promise<void>;
    readonly defaultOptions: TWatchProcessDeathOptions;
    options: TWatchProcessDeathOptions;
    globalCallbackRecords: TGlobalCallbacks;
    globalWatchProcessDeath: TGlobalWatchProcessDeath;
    constructor(options: TWatchProcessDeathUserOptions);
}
