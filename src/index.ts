/// <reference types="node" />
import { startProcessDeathWatching } from './startProcessDeathWatching'
import getGlobalWatchProcessDeath from './getGlobalWatchProcessDeath'
import { addMiddleware } from './addMiddleware'
import { GLOBAL_WATCH_PROCESS_DEATH_PROP_NAME } from './constants'
import { aggregateAndCallCallbacks } from './aggregateAndCallCallbacks'
import { mergeDeep } from './mergeDeep'
import {
    TGlobalCallbacks,
    TWatchProcessDeathOptions,
    TGlobalWatchProcessDeath,
    TWatchProcessDeathUserOptions,
} from './types'
// process.kill(process.pid, 'SIGUSR2')
// process.kill(process.ppid, 'SIGUSR2')

export class WatchProcessDeath {
    private startProcessDeathWatching = startProcessDeathWatching
    addMiddleware = addMiddleware
    getGlobalWatchProcessDeath = getGlobalWatchProcessDeath
    aggregateAndCallCallbacks = aggregateAndCallCallbacks
    readonly defaultOptions: TWatchProcessDeathOptions = {
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
    options: TWatchProcessDeathOptions = this.defaultOptions
    globalCallbackRecords: TGlobalCallbacks = null
    globalWatchProcessDeath: TGlobalWatchProcessDeath = null

    constructor(options: TWatchProcessDeathUserOptions) {
        const isModuleInitiatedPrevious =
            !!globalThis[GLOBAL_WATCH_PROCESS_DEATH_PROP_NAME]

        if (options) {
            this.options = mergeDeep({}, this.defaultOptions, options)
        } else {
            this.options = mergeDeep({}, this.defaultOptions)
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
