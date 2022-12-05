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

export type TCallback = (eventName: string) => void

export type TGlobalCallbackList = TCallback[]

export type TExitHandlerOptions = {
    withExit: boolean
    eventName: 'exit' | 'SIGINT' | 'SIGUSR1' | 'SIGUSR2' | 'uncaughtException'
}

export type TExitHandler = (
    options: TExitHandlerOptions,
    errorOrErrorCode: string | number
) => Promise<void>

export type TWatchProcessDeath = (callback: TCallback) => void
