import { GLOBAL_CALLBACKS_PROP_NAME } from './constants'
import { TExitHandler, TGlobalCallbacks } from '../types'
export const exitHandler: TExitHandler = async (
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
    }

    if (eventName === 'exit') {
        console.error('"exit" errorOrErrorCode:', errorOrErrorCode)
        return
    }

    console.log(...logPart)

    const globalCallbacks: TGlobalCallbacks =
        globalThis[GLOBAL_CALLBACKS_PROP_NAME]

    const globalCallbacksValues = Object.values(globalCallbacks)
    const callbackPromises = globalCallbacksValues.map(callback =>
        callback(eventName)
    )

    await Promise.allSettled(callbackPromises)

    if (withExit) {
        process.exit()
    }
}
