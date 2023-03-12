import { TStartProcessDeathWatching, eventNames } from './types'
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
    for (const eventName of eventNames) {
        const eventOptions = options.events[eventName]
        let withExit = eventOptions?.withExit
        if (withExit === undefined) {
            withExit = this.defaultOptions.events[eventName].withExit
        }
        const processEventHandler = async errorOrErrorCode => {
            const isErrorCode = typeof errorOrErrorCode === 'number'
            const logPart = `\x1b[42m\x1b[30mwatch-process-death\nEvent: ${eventName}\nWith process exit: ${withExit}\x1b[0m`
            if (isErrorCode) {
                const isSuccessCode = errorOrErrorCode === 0
                const message = isSuccessCode ? 'Is success event' : ''
                console.log(logPart, '\n', 'Message:', message)
            } else if (eventName === 'uncaughtException') {
                console.error(
                    '"uncaughtException" errorOrErrorCode:',
                    errorOrErrorCode
                )
                return
            } else {
                console.log(logPart)
            }
            this.aggregateAndCallCallbacks(eventName, withExit)
        }
        process.on(eventName, processEventHandler)
    }
}
