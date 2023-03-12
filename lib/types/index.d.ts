export declare const CEventNames: {
    readonly EXIT: "exit";
    readonly SIGINT: "SIGINT";
    readonly SIGUSR1: "SIGUSR1";
    readonly SIGUSR2: "SIGUSR2";
    readonly UNCAUGHT_EXCEPTION: "uncaughtException";
};
export declare const eventNames: ("exit" | "SIGINT" | "SIGUSR1" | "SIGUSR2" | "uncaughtException")[];
export type TStartProcessDeathWatchingOptions = {
    events: {
        [CEventNames.EXIT]: {
            withExit: boolean;
        };
        [CEventNames.SIGINT]: {
            withExit: boolean;
        };
        [CEventNames.SIGUSR1]: {
            withExit: boolean;
        };
        [CEventNames.SIGUSR2]: {
            withExit: boolean;
        };
        [CEventNames.UNCAUGHT_EXCEPTION]: {
            withExit: boolean;
        };
    };
    callbacksAggregatePendingMs: number;
};
export type TEventNames = (typeof eventNames)[number];
export type TStartProcessDeathWatching = (options?: TStartProcessDeathWatchingOptions) => void;
export type TCallback = (eventName: TEventNames, withExit: boolean) => any;
export type TCallbackRecord = {
    eventName: TEventNames | '';
    filePath: string;
    lineNumber: string;
    callback: TCallback;
};
export type TCallbackRecords = TCallbackRecord[];
type TStackTraceString = string;
export type TGlobalCallbacks = Record<TStackTraceString, TCallbackRecord> | null;
export type TGlobalWatchProcessDeath = {
    callbackRecords: TGlobalCallbacks;
    callbacksAggregatePending: Promise<unknown> | null;
} | null;
export type TProcessEventHandlerOptions = {
    eventName: TEventNames;
    withExit: boolean;
};
export type TProcessEventHandler = (options: TProcessEventHandlerOptions, errorOrErrorCode: string | number) => TCallbackRecords;
export type TAddMiddleware = (callback: TCallback) => void;
export type TGetCallbackRecords = (eventName: TEventNames, withExit: boolean) => Promise<TCallbackRecords | undefined>;
export {};
