import { awaitAllGlobalCallbacks } from './awaitAllGlobalCallbacks'
import { TProcessEventHandler } from './types'
export const processEventHandler: TProcessEventHandler = async (
    { withExit = false, eventName },
    errorOrErrorCode
) => {
    if (!eventName) return
    const isErrorCode = typeof errorOrErrorCode === 'number'
    const logPart = [
        `%c watch-process-death event: ${eventName}`,
        'background: #111; color: #bada55; font-size: 15px',
        '\n',
        'With process exit:',
        withExit,
    ]
    if (isErrorCode) {
        const isSuccessCode = errorOrErrorCode === 0
        const message = isSuccessCode ? 'Is success event' : ''
        console.log(...logPart, '\n', 'Message:', message)
    } else if (eventName === 'uncaughtException') {
        console.error('"uncaughtException" errorOrErrorCode:', errorOrErrorCode)
        return
    } else {
        console.log(...logPart)
    }

    await awaitAllGlobalCallbacks(eventName)

    if (withExit) {
        process.exit()
    }
}
