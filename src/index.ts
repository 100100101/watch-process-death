/// <reference types="node" />
import { startProcessDeathWatching } from './startProcessDeathWatching'
import getGlobalWatchProcessDeath from './getGlobalWatchProcessDeath'
import { addMiddleware } from './addMiddleware'
import { GLOBAL_WATCH_PROCESS_DEATH_PROP_NAME } from './constants'
import { aggregateAndCallCallbacks } from './aggregateAndCallCallbacks'
import {
    TGlobalCallbacks,
    TStartProcessDeathWatchingOptions,
    TGlobalWatchProcessDeath,
} from './types'
// process.kill(process.pid, 'SIGUSR2')
// process.kill(process.ppid, 'SIGUSR2')
export class WatchProcessDeath {
    private startProcessDeathWatching = startProcessDeathWatching
    addMiddleware = addMiddleware
    getGlobalWatchProcessDeath = getGlobalWatchProcessDeath
    aggregateAndCallCallbacks = aggregateAndCallCallbacks
    readonly defaultOptions: TStartProcessDeathWatchingOptions = {
        events: {
            // app is closing
            exit: {
                withExit: true,
            },
            // catches ctrl+c event
            SIGINT: {
                withExit: true,
            },
            //  catches "kill pid" (for example: nodemon restart)
            SIGUSR1: {
                withExit: true,
            },
            SIGUSR2: {
                withExit: true,
            },
            // catches uncaught exceptions
            uncaughtException: {
                withExit: true,
            },
        },
        callbacksAggregatePendingMs: 1000,
    }
    // options: Partial<TStartProcessDeathWatchingOptions> | null = null
    options: TStartProcessDeathWatchingOptions = this.defaultOptions
    globalCallbackRecords: TGlobalCallbacks = null
    globalWatchProcessDeath: TGlobalWatchProcessDeath = null

    constructor(
        options?: Partial<TStartProcessDeathWatchingOptions> | undefined
    ) {
        const isModuleInitiatedPrevious =
            !!globalThis[GLOBAL_WATCH_PROCESS_DEATH_PROP_NAME]

        const optionsEvents = options?.events
        const optionsCallbacksAggregatePendingMs =
            options?.callbacksAggregatePendingMs
        const defaultOptionsEvents = this.defaultOptions.events
        const defaultOptionsCallbacksAggregatePendingMs =
            this.defaultOptions.callbacksAggregatePendingMs

        this.options = {
            events: {
                ...defaultOptionsEvents,
                ...optionsEvents,
            },
            callbacksAggregatePendingMs:
                optionsCallbacksAggregatePendingMs ||
                defaultOptionsCallbacksAggregatePendingMs,
        }
        if (!isModuleInitiatedPrevious) {
            this.startProcessDeathWatching()
        }
        this.globalWatchProcessDeath = getGlobalWatchProcessDeath()
        const callbackRecords = this.globalWatchProcessDeath?.callbackRecords
        if (callbackRecords) {
            this.globalCallbackRecords = callbackRecords
        }
    }
}
