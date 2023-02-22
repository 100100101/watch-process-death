export type TStartProcessDeathWatchingOptions = {
    exit?: {
        withExit: boolean
    }
    SIGINT?: {
        withExit: boolean
    }
    SIGUSR1?: {
        withExit: boolean
    }
    SIGUSR2?: {
        withExit: boolean
    }
    uncaughtException?: {
        withExit: boolean
    }
}

export type TStartProcessDeathWatching = (
    options?: TStartProcessDeathWatchingOptions
) => void

export type TCallback = (eventName: string, withExit: boolean) => void

export type TGlobalCallbacks = {
    [key: string]: TCallback
}

export type TProcessEventHandlerOptions = {
    withExit: boolean
    eventName: 'exit' | 'SIGINT' | 'SIGUSR1' | 'SIGUSR2' | 'uncaughtException'
}

export type TProcessEventHandler = (
    options: TProcessEventHandlerOptions,
    errorOrErrorCode: string | number
) => Promise<void>

export type TWatchProcessDeath = (callback: TCallback) => void
