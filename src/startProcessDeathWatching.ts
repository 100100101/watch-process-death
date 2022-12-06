import { TStartProcessDeathWatching, TGlobalCallbacks } from '../types'
import { exitHandler } from './exitHandler'
import { GLOBAL_CALLBACKS_PROP_NAME } from './constants'

export const startProcessDeathWatching: TStartProcessDeathWatching = (
    options = {}
) => {
    const globalCallbacks: TGlobalCallbacks = {}
    globalThis[GLOBAL_CALLBACKS_PROP_NAME] = globalCallbacks

    process.stdin.resume()
    const defaultEventsOptions = {
        // do something when app is closing
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
        // отлавливает exceptions и не дает завершиться процессу
        uncaughtException: {
            withExit: true,
        },
    }
    const eventsOptions = Object.assign(defaultEventsOptions, options)

    for (const eventEntry of Object.entries(eventsOptions)) {
        const [eventName, eventOptions]: any = eventEntry
        const { withExit } = eventOptions
        process.on(eventName, exitHandler.bind(null, { eventName, withExit }))
    }

    globalThis.isProcessWatchingStarted = true
}
// process.kill(process.pid, 'SIGUSR2')
// process.kill(process.ppid, 'SIGUSR2')
