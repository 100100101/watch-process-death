import { GLOBAL_CALLBACK_LIST_PROP_NAME } from './constants'
import { TExitHandler } from '../types'
export const exitHandler: TExitHandler = async (
    { withExit = false, eventName },
    errorOrErrorCode
) => {
    if (!eventName) return
    const isErrorCode = typeof errorOrErrorCode === 'number'
    if (isErrorCode) {
        const isSuccessCode = errorOrErrorCode === 0
        console.table({
            Event: {
                value: eventName,
            },
            'With process exit': {
                value: withExit,
            },
            Message: {
                value: isSuccessCode ? 'Is success event' : '',
            },
        })
    } else {
        if (eventName === 'uncaughtException') {
            console.error(
                '"uncaughtException" errorOrErrorCode:',
                errorOrErrorCode
            )
            return
        }
    }

    if (eventName === 'exit') {
        console.error('"exit" errorOrErrorCode:', errorOrErrorCode)
        return
    }
    console.table({
        Event: {
            value: eventName,
        },
        'With process exit': {
            value: withExit,
        },
    })
    const globalCallbackList = globalThis[GLOBAL_CALLBACK_LIST_PROP_NAME]

    const callbackPromises = globalCallbackList.map(callback =>
        callback(eventName)
    )

    await Promise.allSettled(callbackPromises)

    if (withExit) {
        // setTimeout(process.exit, 10000)
        process.exit()
    }
}

// process.kill(process.pid, 'SIGUSR2')
// process.kill(process.ppid, 'SIGUSR2')
