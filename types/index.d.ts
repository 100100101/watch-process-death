export enum EEventNames {
    EXIT = 'exit',
    SIGINT = 'SIGINT',
    SIGUSR1 = 'SIGUSR1',
    SIGUSR2 = 'SIGUSR2',
    uncaughtException = 'uncaughtException',
}

export type TStartProcessDeathWatchingDefaultOptions = {
    [EEventNames.EXIT]: {
        withExit: boolean
    }
    [EEventNames.SIGINT]: {
        withExit: boolean
    }
    [EEventNames.SIGUSR1]: {
        withExit: boolean
    }
    [EEventNames.SIGUSR2]: {
        withExit: boolean
    }
    [EEventNames.uncaughtException]: {
        withExit: boolean
    }
}

export type TEventNames = keyof TStartProcessDeathWatchingDefaultOptions

export type TStartProcessDeathWatchingOptions = {
    exit?: {
        withExit?: boolean
    }
    SIGINT?: {
        withExit?: boolean
    }
    SIGUSR1?: {
        withExit?: boolean
    }
    SIGUSR2?: {
        withExit?: boolean
    }
    uncaughtException?: {
        withExit?: boolean
    }
} | null

export type TStartProcessDeathWatching = (
    options?: TStartProcessDeathWatchingOptions
) => void

export type TCallback = (eventName: TEventNames, withExit: boolean) => any
export type TCallbackRecord = {
    filePath: string
    lineNumber: string
    callback: TCallback
}

type TStackTraceString = string
export type TGlobalCallbacks = Record<TStackTraceString, TCallbackRecord> | null

export type TProcessEventHandlerOptions = {
    eventName: TEventNames
    withExit: boolean
}
export type TProcessEventHandler = (
    options: TProcessEventHandlerOptions,
    errorOrErrorCode: string | number
) => Promise<void>

export type TAddMiddleware = (callback: TCallback) => void
