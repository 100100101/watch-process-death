/// <reference types="node" />
import { awaitAllGlobalCallbacks } from './awaitAllGlobalCallbacks'
import { startProcessDeathWatching } from './startProcessDeathWatching'
import getGlobalCallbacks from './getGlobalCallbacks'
import { addMiddleware } from './addMiddleware'
import { processEventHandler } from './processEventHandler'
import { GLOBAL_CALLBACKS_PROP_NAME } from './constants'
import {
    TGlobalCallbacks,
    TStartProcessDeathWatchingOptions,
    TStartProcessDeathWatchingDefaultOptions,
} from '../types'
// process.kill(process.pid, 'SIGUSR2')
// process.kill(process.ppid, 'SIGUSR2')
type TConstructor = TStartProcessDeathWatchingOptions | unknown | undefined
export class WatchProcessDeath {
    addMiddleware = addMiddleware
    private startProcessDeathWatching = startProcessDeathWatching
    awaitAllGlobalCallbacks = awaitAllGlobalCallbacks
    getGlobalCallbacks = getGlobalCallbacks
    processEventHandler = processEventHandler
    readonly defaultEventsOptions: TStartProcessDeathWatchingDefaultOptions = {
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
    }
    options: TStartProcessDeathWatchingOptions = null
    globalCallbacks: TGlobalCallbacks = null

    constructor(options?: TStartProcessDeathWatchingOptions) {
        console.log(1234)

        const isModuleInitiatedPrevious =
            !!globalThis[GLOBAL_CALLBACKS_PROP_NAME]
        this.options = {
            ...this.defaultEventsOptions,
            ...options,
        }
        if (!isModuleInitiatedPrevious) {
            this.startProcessDeathWatching()
        }
        this.globalCallbacks = getGlobalCallbacks()
    }
}
