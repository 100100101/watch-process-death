import {
    TStartProcessDeathWatching,
    TEventNames,
    TStartProcessDeathWatchingDefaultOptions,
} from '../types'
import { WatchProcessDeath } from './'
export const startProcessDeathWatching: TStartProcessDeathWatching = function (
    this: WatchProcessDeath
) {
    const options = this.options

    if (!options) return
    const originalProcessExit = process.exit
    ;(process as any).exit = async function (code) {
        // await awaitAllGlobalCallbacks('exit', true)
        originalProcessExit(code)
    }

    process.stdin.resume()

    type ValueOf<T> = T[keyof T]
    const eventsOptionsEntries = Object.entries(options) as [
        TEventNames,
        ValueOf<TStartProcessDeathWatchingDefaultOptions>
    ][]

    for (const [eventName, eventOptions] of eventsOptionsEntries) {
        let withExit = eventOptions?.withExit
        if (withExit === undefined) {
            withExit = this.defaultEventsOptions[eventName].withExit
        }

        const bindedProcessEventHandler = errorCode => {
            return this.processEventHandler(
                {
                    eventName,
                    withExit,
                },
                errorCode
            )
        }
        process.on(eventName, bindedProcessEventHandler)
    }
}
// process.kill(process.pid, 'SIGUSR2')
// process.kill(process.ppid, 'SIGUSR2')
